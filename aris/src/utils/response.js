"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var response = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(res, code, status, data, message) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!message) {
            message = (0, _httpStatusCodes.getReasonPhrase)(code);
          }
          return _context.abrupt("return", res.status(code).json({
            status: status,
            data: data,
            message: message
          }));
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function response(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = {
  response: response
};