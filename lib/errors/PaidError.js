'use strict';

function PaidError(message) {
  if(!(this instanceof APIError)) {
    return new PaidError(message, apiMethod);
  }

  this.message = message;
  this.stack = (new Error(this.message)).stack;
}

PaidError.prototype = Object.create(Error.prototype);

module.exports = PaidError;
