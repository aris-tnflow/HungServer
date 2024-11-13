"use strict";

var _jsonwebtoken = require("jsonwebtoken");
var _dotenv = require("./dotenv");
var config = {
  secrets: {
    jwt: _dotenv.env.JWT,
    jwtExp: "30d"
  }
};
var createToken = function createToken(user) {
  return (0, _jsonwebtoken.sign)({
    _id: user._id,
    phone: user.phone
  }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};
module.exports = {
  createToken: createToken,
  config: config
};