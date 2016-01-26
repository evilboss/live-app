let Stripe = StripeAPI( Meteor.settings.private.stripe );

Meteor.methods({
  processPayment( charge, orderId, cart ) {
    if (!Meteor.user()) {
      throw new Meteor.Error('logged-out','You must be logged in as a JC Genius to place orders');
    }

    if ( !Roles.userIsInRole(Meteor.userId(),['sales', 'admin']) ) {
      throw new Meteor.Error('authorisation','You must be logged in as a JC Genius (or admin) to place orders');
    }

    if (!OrderIds.findOne( {_id : orderId} )) {
      throw new Meteor.Error('invalid', 'Not a recognised order number. Please try again.');
    }

    check (orderId, String);

    check( charge, {
      amount: Number,
      currency: String,
      source: String,
      description: String,
      receipt_email: String
    });

    check (cart, [{
      product: String,
      qty: Number,
      isProduct: Match.Optional(Boolean),
      isBonus: Match.Optional(Boolean),
      isFree: Match.Optional(Boolean),
      removed: Match.Optional([Object]),
      _id: String
    }]);

    let salesTeam = Meteor.user();

    let products = cart.map((item) => {
      item.isFree = !!item.isFree;
      item.isBonus = !!item.isBonus;
      item.isProduct = !!item.isProduct;
      let product = Products.findOne( {_id: item.product });
      if ( item.isProduct && !item.isBonus && !item.isFree ) {
        return `${item.qty} x ${product.code}`;
      }
    });
    products = _.compact(products).join(", ");

    let tickets = cart.map((item) => {
      item.isFree = !!item.isFree;
      item.isBonus = !!item.isBonus;
      item.isProduct = !!item.isProduct;
      let product = Products.findOne( {_id: item.product });
      if ( !item.isProduct && !item.isBonus && !item.isFree ) {
        return `${item.qty} x ${product.code}`;
      }
    });
    tickets = _.compact(tickets).join(", ");

    let bonuses = cart.map((item) => {
      item.isFree = !!item.isFree;
      item.isBonus = !!item.isBonus;
      item.isProduct = !!item.isProduct;
      let product = Products.findOne( {_id: item.product });
      if ( item.isBonus || item.isFree ) {
        return `${item.qty} x ${product.code}`;
      }
    });
    bonuses = _.compact(bonuses).join(", ");

    charge.metadata = {
      'order-id': orderId,
      'products': products,
      'bonus-products': bonuses,
      'tickets': tickets,
      'sales-team-member': `${salesTeam.profile.name.first} ${salesTeam.profile.name.last} (${salesTeam.emails[0].address})`
    };

    let total = Modules.both.totalOrder(cart);

    let orderProducts = cart.map((item) => {
      let product = Products.findOne( {_id: item.product });
      if (product.price.free) {
        product.price.discounted = 0;
      }
      return {
        qty: item.qty,
        code: product.code,
        price: product.price.discounted,
        itemTotal: item.qty*product.price.discounted,
        discountedItemTotal: Math.round( ( item.qty*product.price.discounted - (total.orderDiscount/100 * item.qty * product.price.discounted) ),0 ),
        commissionRate: product.commission,
        commissionAmount: Math.round( (Math.round( ( item.qty*product.price.discounted - (total.orderDiscount/100 * item.qty * product.price.discounted) ),0 ) * (product.commission/100)) ,0)
      }
    });

    // We hash the Stripe token - we NEVER store the unhashed version anywhere
    let orderToken = CryptoJS.MD5(charge.source).toString();

    Orders.insert({
      orderId: orderId,
      teamMember: Meteor.userId(),
      products: orderProducts,
      orderDiscountRate: total.orderDiscount,
      orderTotal: total.orderTotal,
      status: "pending",
      token: orderToken
    });

    let handleCharge = Meteor.wrapAsync( Stripe.charges.create, Stripe.charges ),
      payment      = handleCharge( charge );

    return payment;
  }
});
