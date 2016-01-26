AppHeader = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      loggedIn: !Meteor.loggingIn() && Meteor.user()
    };
  },
  brandLink() {
    if ( !Meteor.loggingIn() && !Meteor.userId() ) {
      return FlowRouter.path( 'login' );
    }

    return FlowRouter.path( 'index' );
  },
  navigationItems() {
    if ( this.data.loggedIn ) {
      return <AuthenticatedNavigation />;
    } else {
      return <PublicNavigation />;
    }
  },
  render() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href={this.brandLink()}><img src="/assets/images/jc-logo-no-text.png" /></a>
          </div>
          {this.navigationItems()}
        </div>
      </nav>
    );
  }
});
