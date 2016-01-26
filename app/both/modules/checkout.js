let totalOrder = (cartProducts) => {
  let total = {
    count: 0,
    productCount: 0,
    original: 0,
    discountAmount: 0,
    discountPercent: 0,
    subtotal: 0,
    hasEnchilada: false,
    withoutStatusAndPowerInfluence: 0,
    orderDiscount: 0,
    orderDiscountAmount: 0,
    orderTotal: 0,
    orderSavings: 0,
    orderTotalSavings: 0,
    totalDiscount: 0
  };

  for (let cart of cartProducts) {

    let product = Products.findOne({_id: cart.product});

    // Ignore free products for checkout calculations
    if (product.price.free) continue;

    // add one to total products
    total.count++;

    // add to product count UNLESS it is event ticket
    if (_.indexOf(["ticket-badass-retreat-may-2016",
        "friend-ticket-badass-retreat-may-2016"], product.code) === -1) {
      total.productCount++;
    }

    // add original price to original total
    total.original += (cart.qty * product.price.original);

    // add discounted price (cents) to discount total
    total.discountAmount += (cart.qty * product.price.discounted);
    let savings = ((cart.qty * product.price.original * 100) - (cart.qty * product.price.discounted));
    total.orderSavings += savings;
    total.orderTotalSavings += savings;

    // add discounted price to order subtotal
    total.subtotal += (cart.qty * product.price.discounted);

    // Prepare upsell offer
    if (_.indexOf(['status', 'power-influence', 'enchilada', 'tickets-badass-retreat-may-2016',
        'friend-tickets-badass-retreat-may-2016'], product.code) === -1) {
      total.withoutStatusAndPowerInfluence += (cart.qty * product.price.discounted);
    }

    if (product.code === 'enchilada') {
      total.hasEnchilada = true;
    }
  }

  total.orderTotal = total.subtotal;
  if (total.productCount >= 3) {
    total.orderDiscount = 10;
    total.orderDiscountAmount = Math.round(total.orderTotal*(total.orderDiscount/100),2);
    total.orderTotal -= total.orderDiscountAmount;
    total.orderTotalSavings += total.orderDiscountAmount;
  }

  total.orderTotal = Math.round(total.orderTotal);

  total.totalDiscount = ( total.orderTotalSavings === 0 ) ? 0 : ((total.orderTotalSavings / (total.original * 100)) * 100);

//      console.dir(total);
  return total;

};

Modules.both.totalOrder= totalOrder;
