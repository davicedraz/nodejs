
class DuplicityException extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicityException";
  }
}

class AuthorizationException extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationException";
  }
}

module.exports = {
  DuplicityException,
  AuthorizationException
}
