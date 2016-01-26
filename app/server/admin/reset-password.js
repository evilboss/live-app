Accounts.emailTemplates.resetPassword.siteName = () => "Live Event App";
Accounts.emailTemplates.resetPassword.from     = () => "Live Event App <`${Meteor.settings.public.adminEmail}`>";
Accounts.emailTemplates.resetPassword.subject  = () => "[Live Event App] Reset Your Password";

Accounts.emailTemplates.resetPassword.text = ( user, url ) => {
  let emailAddress   = user.emails[0].address,
      urlWithoutHash = url.replace( '#/', '' ),
      supportEmail   = Meteor.settings.public.supportEmail,
      emailBody      = `A password reset has been requested for the account related to this address (${emailAddress}). To reset the password, visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this reset, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

  return emailBody;
};
