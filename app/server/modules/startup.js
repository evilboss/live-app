let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
  _generateProducts();

};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => {
  BrowserPolicy.content.allowOriginForAll("https://js.stripe.com/");
  BrowserPolicy.content.allowOriginForAll("https://checkout.stripe.com/");
  BrowserPolicy.content.allowOriginForAll("https://q.stripe.com/");
};

var _generateAccounts = () => Modules.server.generateAccounts();

var _generateProducts = () => Modules.server.generateProducts();

Modules.server.startup = startup;
