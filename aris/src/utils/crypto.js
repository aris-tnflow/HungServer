"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encrypt = exports.decrypt = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _cryptoJs = _interopRequireDefault(require("crypto-js"));
var _dotenv = require("./dotenv.js");
var secretkey = _dotenv.env.SECRETKEY;
var encrypt = function encrypt(data) {
  try {
    var dataString = (0, _typeof2["default"])(data) === 'object' ? JSON.stringify(data) : String(data);
    var encrypted = _cryptoJs["default"].AES.encrypt(dataString, secretkey);
    return encrypted.toString();
  } catch (error) {
    return null;
  }
};
exports.encrypt = encrypt;
var decrypt = function decrypt(encryptedString) {
  try {
    var decrypted = _cryptoJs["default"].AES.decrypt(encryptedString, secretkey);
    var decryptedString = decrypted.toString(_cryptoJs["default"].enc.Utf8);
    try {
      return JSON.parse(decryptedString);
    } catch (_unused) {
      return decryptedString;
    }
  } catch (error) {
    return null;
  }
};
exports.decrypt = decrypt;