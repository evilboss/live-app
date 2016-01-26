SalesByProduct = new Meteor.Collection( 'salesByProduct' );

SalesByProduct.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

SalesByProduct.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let SalesByProductSchema = new SimpleSchema({
  code: {
    type: String,
    label: "The unique product code."
  },
  qty: {
    type: Number,
    label: "Total qty sold for this product"
  },
  totalSales: {
    type: Number,
    label: "Total sales for this product"
  },
  totalCommission: {
    type: Number,
    label: "Total commission for this product"
  }
});

SalesByProduct.attachSchema( SalesByProductSchema );

if (Meteor.isServer) {
  Meteor.startup( () => {
    SalesByProduct._ensureIndex({"code": 1});
  });
}
