let administrators = [
  {
    name: { first: 'Steve', last: 'Ovens' },
    email: 'steve@steveovens.com',
    password: 'iewcaQvs9DHd7dJ'
  },
  {
    name: { first: 'Jason', last: 'Capital' },
    email: 'jasoncapitalhelpdesk@gmail.com',
    password: 'theFreeAlpha11'
  },

];

let salesTeam = [
  {
    name: { first: 'Sales', last: 'Person' },
    email: 'steven.ovens@gmail.com',
    password: 'password'
  },
  {
    name: {first: 'Sales2', last: 'Person2'},
    email: 'steve@uonmedia.com',
    password: 'password'
  }
];

let generateAccounts = () => {
  let usersExist    = _checkIfAccountsExist( administrators.length + salesTeam.length );

  if ( !usersExist ) {
    _createUsers( administrators, ['admin'] );
    _createUsers( salesTeam, ['sales'] );
  }
};

let _checkIfAccountsExist = ( count ) => {
  let userCount = Meteor.users.find().count();
  return userCount < count ? false : true;
};

let _createUsers = ( users, roles ) => {
  for ( let i = 0; i < users.length; i++ ) {
    let user       = users[ i ],
        userExists = _checkIfUserExists( user.email );

    let _id = null;
    if ( !userExists ) {
      _id = _createUser( user );
    } else {
      _id = userExists._id;
    }

    // Make sure user is in roles
    Roles.addUsersToRoles(_id, roles);
  }
};

let _checkIfUserExists = ( email ) => {
  return Meteor.users.findOne( { 'emails.address': email } );
};

let _createUser = ( user ) => {
  return Accounts.createUser({
    email: user.email,
    password: user.password,
    profile: {
      name: user.name
    }
  });
};

Modules.server.generateAccounts = generateAccounts;
