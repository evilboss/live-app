Products = new Meteor.Collection( 'products' );

Products.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Products.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let ProductSchema = new SimpleSchema({
  code: {
    type: String,
    label: "Unique product identifying string."
  },
  order: {
    type: Number,
    label: "Sort order to display products in"
  },
  requires: {
    type: [String],
    label: "Array of other product codes that must be in cart to make this product available",
    optional: true
  },
  name: {
    type: String,
    label: "Name of the product"
  },
  description: {
    type: [String],
    label: "Product description"
  },
  includes: {
    type: [String],
    label: "Products included in this product",
    optional: true
  },
  excludes: {
    type: [String],
    label: "Products NOT included in this product",
    optional: true
  },
  displayName: {
    type: String,
    label: "Display name for the product. Defaults to name if not present",
    optional: true
  },
  image: {
    type: String,
    label: "URL of the image to display for the product"
  },
  "price.original": {
    type: Number,
    label: "Original price in integer dollars",
    optional: true
  },
  "price.discounted": {
    type: Number,
    label: "Discounted price in integer pennies",
    optional: true
  },
  "price.discount": {
    type: Number,
    label: "Discount percentage to display. Integer",
    optional: true
  },
  "price.saving": {
    type: Number,
    label: "Saving amount to display. Integer dollars",
    optional: true
  },
  "price.free": {
    type: Boolean,
    label: "Is this a free product",
  },
  commission: {
    type: Number,
    label: "Commssion paid on this product. Integer percentage"
  },
  limit_quantity: {
    type: Number,
    label: "Maximum number of this product a single user can purchase",
    optional: true
  },
  level: {
    type: [String],
    label: "What sort of users this product is suitable for - Beginner, Intermediate, Advanced"
  },
  info: {
    type: [String],
    label: "URL to the product sales information page(s)"
  },
  pick_one: {
    type: Boolean,
    label: "Indicates whether only one of these products can be selected"
  },
  rating: {
    type: String,
    label: "Content rating",
    optional: true
  },
  premium: {
    type: Boolean,
    label: "Indicates if this is a premium product"
  }
});

Products.attachSchema( ProductSchema );

if (Meteor.isServer) {
  Meteor.startup( () => {
    Products._ensureIndex({"code": 1});
    Products._ensureIndex({"order": 1});
  })
}
