const validUsername = 'Admin';
const validRole = 'admin';
const validEmail = 'admin@admin.com';
const validPassword = 'secret_admin'
const hashedPassword = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'

const validLoginBody = { email: validEmail, password: validPassword };
const noMailLoginBody = { email: '', password: validPassword };
const noPassLoginBody = { email: validEmail, password: '' };
const notExistingMailBody = { email: 'notfound@email.com', password: validPassword };
const existingMailWithWrongPassBody = { email: validEmail, password: 'wrong_pass' };

const existingUser = {
  username: validUsername,
  role: validRole,
  email: validEmail,
  password: hashedPassword,
};

export default {
  validLoginBody,
  noMailLoginBody,
  noPassLoginBody,
  notExistingMailBody,
  existingMailWithWrongPassBody,
  existingUser,
}