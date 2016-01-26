PublicNavigation = React.createClass({
  signup() {
    let signupAllowed = false;
    return this.signupAllowed ? (
      <li className={FlowHelpers.currentRoute( 'signup' )}>
        <a href={FlowHelpers.pathFor( 'signup' )}>Sign Up</a>
      </li>
    ) : "";
  },
  render() {
    return (
      <div id="navbar-collapse" className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <li className={FlowHelpers.currentRoute( 'login' )}>
            <a href={FlowHelpers.pathFor( 'login' )}>Login</a>
          </li>
          {this.signup}
        </ul>
      </div>
    );
  }
});
