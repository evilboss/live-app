Dashboard = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let teamHandle = Meteor.subscribe('salesByTeamMember');
    let productsHandle = Meteor.subscribe('salesByProduct');

    return {
      isLoading: !teamHandle.ready() && !productsHandle.ready(),
      teamStats: SalesByTeamMember.find({}, {sort: {totalSales: -1}}).fetch(),
      productSales: SalesByProduct.find({}, {sort: {totalSales: -1, qty: -1}}).fetch(),
    };
  },
  componentDidMount(){
    if (!Meteor.user() || !Roles.userIsInRole(Meteor.user()._id, ['sales', 'admin'])) {
      FlowRouter.go('/');
    }
  },
  render() {
    if (this.data.isLoading) {
      return <Loading />;
    } else {
      if (Meteor.user() && Roles.userIsInRole(Meteor.user()._id, ['sales', 'admin'])) {
        return (
          <Leaderboard teamSalesStats={this.data.teamStats} productSales={this.data.productSales} />
        );
      }
      FlowRouter.go('/');
      return (<h1>NOT ALLOWED</h1>);

    }
  }
    });
