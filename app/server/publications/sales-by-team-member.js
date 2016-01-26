Meteor.publish( 'salesByTeamMember', function() {
  if (this.userId && Roles.userIsInRole(this.userId, ['admin','sales'])) {
    return SalesByTeamMember.find();
  }
});
