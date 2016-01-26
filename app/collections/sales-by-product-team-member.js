SalesByProductTeamMember = new Meteor.Collection( 'salesByProductTeamMember' );

SalesByProductTeamMember.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

SalesByProductTeamMember.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let SalesByProductTeamMemberSchema = new SimpleSchema({
  code: {
    type: String,
    label: "The unique product code."
  },
  teamMember: {
    type: String,
    label: "The user ID of the team member taking the order"
  },
  displayName: {
    type: String,
    label: "Display name for the team member"
  },
  qty: {
    type: Number,
    label: "Total units sold for this product for the team member"
  },
  totalSales: {
    type: Number,
    label: "Total sales for this product for the team member"
  },
  totalCommission: {
    type: Number,
    label: "Total commission for this product for the team member"
  }
});

SalesByProductTeamMember.attachSchema( SalesByProductTeamMemberSchema );

if (Meteor.isServer) {
  Meteor.startup( () => {
    SalesByProductTeamMember._ensureIndex({"code": 1, "teamMember": 1});
  });
}
