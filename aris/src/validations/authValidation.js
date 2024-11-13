"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authValidation = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _httpStatusCodes = require("http-status-codes");
var _apiError = _interopRequireDefault(require("../utils/apiError.js"));
var login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          correctCondition = _joi["default"].object({
            name: _joi["default"].string().required().min(3).trim().strict().messages({
              "any.required": "Tên bắt buộc phải có",
              "string.empty": "Tên không được bỏ trống",
              "string.min": "Tên phải có ít nhất {#limit} ký tự",
              "string.trim": "Tên không hợp lệ (Không khoảng cách)"
            }),
            password: _joi["default"].string().required().trim().min(5).strict().messages({
              "any.required": "Mật khẩu bắt buộc phải có",
              "string.empty": "Mật khẩu không được bỏ trống",
              "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
              "string.trim": "Mật khẩu không hợp lệ (Không khoảng cách)"
            })
          });
          _context.prev = 1;
          _context.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          next(new _apiError["default"](_httpStatusCodes.StatusCodes.UNPROCESSABLE_ENTITY, new Error(_context.t0).message));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 7]]);
  }));
  return function login(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var register = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          correctCondition = _joi["default"].object({
            name: _joi["default"].string().required().min(3).trim().strict().messages({
              "any.required": "Tên bắt buộc phải có",
              "string.empty": "Tên không được bỏ trống",
              "string.min": "Tên phải có ít nhất {#limit} ký tự",
              "string.trim": "Tên không hợp lệ (Không khoảng cách)"
            }),
            email: _joi["default"].string().email().required().trim().strict().messages({
              "any.required": "Email bắt buộc phải có",
              "string.empty": "Email không được bỏ trống",
              "string.email": "Email không hợp lệ",
              "string.trim": "Email không hợp lệ (Không khoảng cách)"
            }),
            password: _joi["default"].string().required().trim().min(5).strict().messages({
              "any.required": "Mật khẩu bắt buộc phải có",
              "string.empty": "Mật khẩu không được bỏ trống",
              "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
              "string.trim": "Mật khẩu không hợp lệ (Không khoảng cách)"
            }),
            phone: _joi["default"].string().required().trim().min(5).strict().messages({
              "any.required": "Số điện thoại bắt buộc phải có",
              "string.empty": "Số điện thoại không được bỏ trống",
              "string.min": "Số điện thoại phải có ít nhất {#limit} ký tự",
              "string.trim": "Số điện thoại không hợp lệ (Không khoảng cách)"
            }),
            gender: _joi["default"].string().required().min(3).trim().strict().messages({
              "any.required": "Giới tính bắt buộc phải có",
              "string.empty": "Giới tính không được bỏ trống",
              "string.min": "Giới tính phải có ít nhất {#limit} ký tự",
              "string.trim": "Giới tính không hợp lệ (Không khoảng cách)"
            }),
            jti: _joi["default"].string().min(3).trim().strict().messages({}),
            avatar: _joi["default"].string().min(3).trim().strict().messages({}),
            verify: _joi["default"].string().min(3).trim().strict().messages({})
          });
          _context2.prev = 1;
          _context2.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](1);
          next(new _apiError["default"](_httpStatusCodes.StatusCodes.UNPROCESSABLE_ENTITY, new Error(_context2.t0).message));
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 7]]);
  }));
  return function register(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var authValidation = {
  login: login,
  register: register
};
exports.authValidation = authValidation;