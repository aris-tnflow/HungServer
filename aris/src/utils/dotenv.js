"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();
var MONGODB_URI = process.env.MONGODB_URI;
var JWT = process.env.JWT;
var SECRETKEY = process.env.SECRETKEY;
var PORT = process.env.PORT || 5000;
var URL_API = process.env.URL_API || "http://localhost:8082";
var URL_CLIENT = process.env.URL_CLIENT || "http://localhost:5173";
var EMAIL_USER = process.env.EMAIL_USER || "admin@chickenwar.vn";
var EMAIL_PASS = process.env.EMAIL_PASS || "brct txis vhij pvph";
var env = {
  PORT: PORT,
  JWT: JWT,
  URL_API: URL_API,
  SECRETKEY: SECRETKEY,
  URL_CLIENT: URL_CLIENT,
  MONGODB_URI: MONGODB_URI,
  EMAIL_PASS: EMAIL_PASS,
  EMAIL_USER: EMAIL_USER
};
exports.env = env;