"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protectedRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = require("jsonwebtoken");
var _httpStatusCodes = require("http-status-codes");
var _token = require("./token");
var _response = require("./response");
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _constants = require("./constants");
var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var payload, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (token) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return");
        case 2:
          _context.prev = 2;
          _context.next = 5;
          return (0, _jsonwebtoken.verify)(token, _token.config.secrets.jwt);
        case 5:
          payload = _context.sent;
          _context.next = 8;
          return _userModel["default"].findById(payload._id);
        case 8:
          user = _context.sent;
          if (!user) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", user);
        case 13:
          return _context.abrupt("return");
        case 14:
          _context.next = 19;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return");
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 16]]);
  }));
  return function verifyToken(_x) {
    return _ref.apply(this, arguments);
  };
}();
var isUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.headers.authorization) {
            _context2.next = 18;
            break;
          }
          _context2.prev = 1;
          _context2.next = 4;
          return verifyToken(req.headers.authorization.split("Bearer ")[1]);
        case 4:
          user = _context2.sent;
          if (!user) {
            _context2.next = 10;
            break;
          }
          req.user = user;
          next();
          _context2.next = 11;
          break;
        case 10:
          return _context2.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.NOT_FOUND, false, {}, "Không có quyền truy cập!"));
        case 11:
          _context2.next = 16;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](1);
          return _context2.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, false, err, err.message));
        case 16:
          _context2.next = 19;
          break;
        case 18:
          return _context2.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.NOT_ACCEPTABLE, false, {}, "Chưa đăng nhập!"));
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 13]]);
  }));
  return function isUser(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var isAdminMax = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!req.headers.authorization) {
            _context3.next = 18;
            break;
          }
          _context3.prev = 1;
          _context3.next = 4;
          return verifyToken(req.headers.authorization.split("Bearer ")[1]);
        case 4:
          user = _context3.sent;
          if (!(user && user.userType === _constants.TYPE_EMPLOYEE.admin)) {
            _context3.next = 10;
            break;
          }
          req.user = user;
          next();
          _context3.next = 11;
          break;
        case 10:
          return _context3.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.NOT_FOUND, false, {}, "Không có quyền truy cập!"));
        case 11:
          _context3.next = 16;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, false, _context3.t0, _context3.t0.message));
        case 16:
          _context3.next = 19;
          break;
        case 18:
          return _context3.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.NOT_ACCEPTABLE, false, {}, "Chưa đăng nhập!"));
        case 19:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 13]]);
  }));
  return function isAdminMax(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var isAdmin = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!req.headers.authorization) {
            _context4.next = 18;
            break;
          }
          _context4.prev = 1;
          _context4.next = 4;
          return verifyToken(req.headers.authorization.split("Bearer ")[1]);
        case 4:
          user = _context4.sent;
          if (!(user && user.userType === _constants.TYPE_EMPLOYEE.admin || user.userType === _constants.TYPE_EMPLOYEE.adminControl)) {
            _context4.next = 10;
            break;
          }
          req.user = user;
          next();
          _context4.next = 11;
          break;
        case 10:
          return _context4.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.NOT_FOUND, false, {}, "Không có quyền truy cập!"));
        case 11:
          _context4.next = 16;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, false, _context4.t0, _context4.t0.message));
        case 16:
          _context4.next = 19;
          break;
        case 18:
          return _context4.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.NOT_ACCEPTABLE, false, {}, "Chưa đăng nhập!"));
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 13]]);
  }));
  return function isAdmin(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
var protectedRoute = {
  isUser: isUser,
  isAdmin: isAdmin,
  isAdminMax: isAdminMax,
  verifyToken: verifyToken
};
exports.protectedRoute = protectedRoute;