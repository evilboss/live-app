Orders = new Meteor.Collection( 'Orders' );

Orders.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Orders.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let OrdersSchema = new SimpleSchema({
  orderId: {
    type: String,
    label: "Unique order id (from OrderIds)."
  },
  teamMember: {
    type: String,
    label: "User id of the sales team member"
  },
  // Force value to be current date (on server) upon insert
  // and prevent updates thereafter.
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  products: {
    type: [Object]
  },
  "products.$.qty": {
    type: Number
  },
  "products.$.code": {
    type: String
  },
  "products.$.price": {
    type: Number
  },
  "products.$.itemTotal": {
    type: Number
  },
  "products.$.discountedItemTotal": {
    type: Number
  },
  "products.$.commissionRate": {
    type: Number
  },
  "products.$.commissionAmount": {
    type: Number
  },
  orderDiscountRate: {
    type: Number
  },
  orderTotal: {
    type: Number
  },
  status: {
    type: String
  },
  reason: {
    type: String,
    optional: true
  },
  token: {
    type: String,
    optional: true
  }
});

Orders.attachSchema( OrdersSchema );

if (Meteor.isServer) {
  Meteor.startup( () => {
    Orders._ensureIndex({"orderId": 1});
    Orders._ensureIndex({"orderId": 1, "token": 1});
  });
}


