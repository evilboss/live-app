Meteor.publish( 'salesByProduct', function() {
  if (this.userId && Roles.userIsInRole(this.userId, ['admin', 'sales'])) {
    return SalesByProduct.find();
  }
});
