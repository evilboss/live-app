OrderIds = new Meteor.Collection( 'orderIds' );

OrderIds.allow({
  insert: () => true,
  update: () => false,
  remove: () => false
});

OrderIds.deny({
  insert: () => false,
  update: () => true,
  remove: () => true
});
