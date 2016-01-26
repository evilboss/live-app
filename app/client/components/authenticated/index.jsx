Index = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      roles: Meteor.user() ? Meteor.user().roles : null
      //attribute: value,
    };
  },
  default() {
    return (
      <div className="jumbotron text-center" style={{padding: '20px'}}>
        <h2>Exclusive Live Event Deals</h2>
        <p>Please login to access your deals...</p>
        <p><a className="btn btn-success" href="/login" role="button">Login</a></p>
        <p style={{fontSize: '16px', color: '#aaa'}}>Custom built for Jason Capital by WellCraftedApps</p>
      </div>
    );
  },
  render() {
    if (this.data.roles == null) {
      return this.default();
    } else if (_.indexOf(this.data.roles,'sales') !== -1) {
      return (
        <Deals />
      )
    } else if (_.indexOf(this.data.roles, 'customer') !== -1) {
      return (
        <h1>Here Are Your Deals</h1>
      )
    } else if (_.indexOf(this.data.roles, 'admin') !== -1) {
      return (
        <h1>Orders Dashboard</h1>
      )
    }
  }
});
