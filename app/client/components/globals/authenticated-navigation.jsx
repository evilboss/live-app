AuthenticatedNavigation = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    return {
      currentUserEmail: Meteor.user() ? Meteor.user().emails[0].address : "n/a"
    };
  },
  showNewGenius() {
    if (!Meteor.loggingIn() && Meteor.user() && Roles.userIsInRole(Meteor.userId(),'admin')) {
      return <li className={FlowHelpers.currentRoute( 'new-genius' )}><a href="/new-genius">New Genius</a></li>

    }
  },
  logout() {
    return Meteor.logout();
  },
  render() {
    return (
      <div id="navbar-collapse" className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li className={FlowHelpers.currentRoute( 'index' )}><a href="/"><i className="fa fa-home"></i></a></li>
          <li className={FlowHelpers.currentRoute( 'dashboard' )}><a href="/dashboard"><i className="fa fa-dashboard"></i></a></li>
          {this.showNewGenius()}
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">{this.data.currentUserEmail} <span className="caret"></span></a>
            <ul className="dropdown-menu" role="menu">
              <li onClick={this.logout}><a href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});
