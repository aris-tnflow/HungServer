"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rateLimiter = void 0;
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
function createRateLimiter(time, limit) {
  return (0, _expressRateLimit["default"])({
    windowMs: time * 60 * 1000,
    limit: limit,
    message: {
      status: 429,
      message: "Qu\xE1 nhi\u1EC1u y\xEAu c\u1EA7u, vui l\xF2ng th\u1EED l\u1EA1i sau ".concat(time, " ph\xFAt")
    }
  });
}
var File = createRateLimiter(1, 100);
var All = createRateLimiter(1, 500);
var User = createRateLimiter(1, 100);
var Admin = createRateLimiter(1, 50);
var Bank = createRateLimiter(1, 10);
var Auth = createRateLimiter(5, 10);
var One = createRateLimiter(1, 60);
var Private = createRateLimiter(120, 1);
var rateLimiter = {
  All: All,
  User: User,
  Admin: Admin,
  File: File,
  Bank: Bank,
  Auth: Auth,
  One: One,
  Private: Private
};
exports.rateLimiter = rateLimiter;