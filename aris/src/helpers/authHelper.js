"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = exports.comparePassword = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var hashPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
    var saltRounds, hashedPassword;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          saltRounds = 10;
          _context.next = 3;
          return _bcryptjs["default"].hash(password, saltRounds);
        case 3:
          hashedPassword = _context.sent;
          return _context.abrupt("return", hashedPassword);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function hashPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.hashPassword = hashPassword;
var comparePassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(password, hashedPassword) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", _bcryptjs["default"].compare(password, hashedPassword));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function comparePassword(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
exports.comparePassword = comparePassword;