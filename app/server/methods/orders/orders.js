Meteor.methods({
  approveOrder(orderId, token) {
    if (!Meteor.user()) {
      throw new Meteor.Error('logged-out', 'You must be logged in as a JC Genius to place orders');
    }

    if (!Roles.userIsInRole(Meteor.userId(), ['sales', 'admin'])) {
      throw new Meteor.Error('authorisation', 'You must be logged in as a JC Genius (or admin) to place orders');
    }

    if (!OrderIds.findOne({_id: orderId})) {
      throw new Meteor.Error('invalid', 'Not a recognised order number. Please try again.');
    }

    check(orderId, String);

    check(token, String);

    let orderToken = CryptoJS.MD5(token).toString();

    let order = Orders.findOne({orderId: orderId, token: orderToken});

    if (!order) {
      throw new Meteor.Error('invalid', `Unable to find matching order [${orderId}]`);
    }

    Orders.update({_id: order._id},{$set: {status: "approved"}});

    let teamMember = Meteor.users.findOne(order.teamMember);

    let displayName = `${Meteor.user().profile.name.first} ${Meteor.user().profile.name.last}`;

    let orderUnits = 0;
    let orderCommission = 0;
    for (let product of order.products) {
      if (!product.price.free) {
        orderUnits += product.qty;
        orderCommission += product.commissionAmount;
      }

      SalesByProduct.upsert({code: product.code},
        {
          $set: {
            code: product.code
          },
          $inc: {
            qty: product.qty,
            totalSales: product.itemTotal,
            totalCommission: product.commissionAmount
          }
        },{validate: false}
      );

      SalesByProductTeamMember.upsert({code: product.code, teamMember: order.teamMember},
        {
          $set: {
            code: product.code,
            teamMember: order.teamMember,
            displayName: displayName
          },
          $inc: {
            qty: product.qty,
            totalSales: product.itemTotal,
            totalCommission: product.commissionAmount
          }
        },{validate: false}
      );
    }


    SalesByTeamMember.upsert({teamMemberId: order.teamMember},
      {
        $set: {
          teamMemberId: order.teamMember,
          displayName: displayName
        },
        $inc: {
          totalUnits: orderUnits,
          totalSales: order.orderTotal,
          totalCommission: orderCommission
        }
      },{validate: false});
  },
  orderFailed(orderId, token, reason) {
    if (!Meteor.user()) {
      throw new Meteor.Error('logged-out', 'You must be logged in as a JC Genius to place orders');
    }

    if (!Roles.userIsInRole(Meteor.userId(), ['sales', 'admin'])) {
      throw new Meteor.Error('authorisation', 'You must be logged in as a JC Genius (or admin) to place orders');
    }

    if (!OrderIds.findOne({_id: orderId})) {
      throw new Meteor.Error('invalid', 'Not a recognised order number. Please try again.');
    }

    check(orderId, String);

    check(token, String);

    check(reason, String);

    let orderToken = CryptoJS.MD5(token).toString();

    let order = Orders.findOne({orderId: orderId, token: orderToken});

    if (!order) {
      throw new Meteor.Error('invalid', `Unable to find matching order [${orderId}] with token [${orderToken}]`);
    }

    Orders.update({_id: order._id},{$set: {status: "rejected", reason: reason}});

  }
});
