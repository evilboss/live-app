Meteor.publish( 'salesByProductTeamMember', function() {
  if (this.userId && Roles.userIsInRole(this.userId, ['admin','sales'])) {
    return SalesByProductTeamMember.find();
  }
});
