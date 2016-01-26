const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/', {
  name: 'index',
  action() {
    ReactLayout.render( Default, { yield: <Index /> } );
  }
});

authenticatedRoutes.route( '/dashboard', {
  name: 'dashboard',
  action() {
      console.log('dashboard');
    ReactLayout.render( Default, { yield: <Dashboard /> } );
  }
});

authenticatedRoutes.route( '/new-genius', {
  name: 'new-genius',
  action() {
    ReactLayout.render( Default, { yield: <NewGenius /> } );
  }
});
