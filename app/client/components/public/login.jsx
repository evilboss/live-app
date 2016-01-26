Login = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      //attribute: value,
    };
  },
  componentDidMount() {
    Modules.client.login( { form: "#login" } );
  },
  preventSubmit(event) {
    // This prevents the default form submission via the onSubmit handler
    // Defer to handleSubmit() with form validation - see above
    event.preventDefault();
  },
  signupLink() {
    let signupAllowed = false;
    return signupAllowed ? (
      <p>Don't have an account? <a href="/signup">Sign Up</a>.</p>
    ) : "";
  },
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <h4 className="page-header">Login</h4>
          <form id="login" className="login" onSubmit={this.preventSubmit}>
            <div className="form-group">
              <label htmlFor="emailAddress">Email Address</label>
              <input type="email" name="emailAddress" className="form-control" placeholder="Email Address" />
            </div>
            <div className="form-group">
              <label htmlFor="password"><span className="pull-left">Password</span> <a className="pull-right" href="/recover-password">Forgot Password?</a></label>
              <input type="password" name="password" className="form-control" placeholder="Password" />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-success" value="Login" />
            </div>
          </form>
          {this.signupLink}
        </div>
      </div>
    );
  }
});
