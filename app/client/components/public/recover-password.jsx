RecoverPassword = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      //attribute: value,
    };
  },
  componentDidMount() {
    Modules.client.recoverPassword({
      form: "#recover-password"
    });
  },
  preventSubmit(event) {
    // This prevents the default form submission via the onSubmit handler
    // Defer to handleSubmit() with form validation - see above
    event.preventDefault();
  },
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <h4 className="page-header">Recover Password</h4>
          <form id="recover-password" className="recover-password" onSubmit={this.handleSubmit}>
            <p className="alert alert-info">Enter your email address below to receive a link to reset your password.</p>
            <div className="form-group">
              <label htmlFor="emailAddress">Email Address</label>
              <input type="email" name="emailAddress" className="form-control" placeholder="Email Address" />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-success" value="Recover Password" />
            </div>
          </form>
        </div>
      </div>
    );
  }
});
