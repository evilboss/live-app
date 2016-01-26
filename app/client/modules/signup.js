let signup = ( options ) => {
  _validate( options.form );
};

let _validate = ( form ) => {
  $( form ).validate( validation() );
};

let validation = () => {
  return {
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      },
      password: {
        required: 'Need a password here.',
        minlength: 'Use at least six characters, please.'
      }
    },
    submitHandler() { _handleSignup(); }
  };
};

let _handleSignup = () => {
  if (Meteor.loggingIn() || !Meteor.user() || !Roles.userIsInRole(Meteor.userId(),'admin')) {
    Bert.alert ('Must be logged in as admin to create a new Genius account', 'danger');
    return;
  }

  let user = {
    email: $( '[name="emailAddress"]' ).val(),
    password: $( '[name="password"]' ).val()
  };

  Accounts.createUser( user, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, 'danger' );
    } else {
      Bert.alert( `New Genius Account Created for ${user.email}`, 'success' );
      FlowRouter.go('/');
    }
  });
};

Modules.client.signup = signup;
