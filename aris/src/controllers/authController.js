"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _userModel = _interopRequireDefault(require("../models/userModel.js"));
var _authHelper = require("../helpers/authHelper.js");
var _httpStatusCodes = require("http-status-codes");
var _slugify = _interopRequireDefault(require("slugify"));
var _token = require("../utils/token");
var _protected = require("../utils/protected");
var _response = require("../utils/response");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var formatUserResponse = function formatUserResponse(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    province: user.province,
    district: user.district,
    ward: user.ward,
    avatar: user.avatar,
    gender: user.gender,
    notify: user.notify,
    userType: user.userType,
    activeStatus: user.activeStatus,
    slug: user.slug,
    courses: user.courses,
    video: user.video
  };
};
var handleTokenAndResponse = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(res, user) {
    var successStatus,
      token,
      userNew,
      _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          successStatus = _args.length > 2 && _args[2] !== undefined ? _args[2] : _httpStatusCodes.StatusCodes.ACCEPTED;
          _context.next = 3;
          return (0, _token.createToken)(user);
        case 3:
          token = _context.sent;
          userNew = formatUserResponse(user);
          if (!token) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", (0, _response.response)(res, successStatus, true, {
            user: userNew,
            token: token
          }, null));
        case 7:
          return _context.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.BAD_REQUEST, false, {}, "Could not generate token"));
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function handleTokenAndResponse(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var register = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, name, email, phone, password, existingUser, hashedPassword, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, phone = _req$body.phone, password = _req$body.password;
          _context2.next = 4;
          return _userModel["default"].findOne({
            $or: [{
              email: email
            }, {
              phone: phone
            }]
          });
        case 4:
          existingUser = _context2.sent;
          if (!existingUser) {
            _context2.next = 10;
            break;
          }
          if (!(existingUser.email === email)) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.NOT_ACCEPTABLE, false, {}, "Email Đã Tồn Tại!"));
        case 8:
          if (!(existingUser.phone === phone)) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.NOT_ACCEPTABLE, false, {}, "Số Điện Thoại Đã Tồn Tại!"));
        case 10:
          _context2.next = 12;
          return (0, _authHelper.hashPassword)(password);
        case 12:
          hashedPassword = _context2.sent;
          _context2.next = 15;
          return new _userModel["default"](_objectSpread(_objectSpread({}, req.body), {}, {
            password: hashedPassword,
            slug: (0, _slugify["default"])(name),
            userType: "user",
            activeStatus: true
          })).save();
        case 15:
          user = _context2.sent;
          if (user) {
            _context2.next = 18;
            break;
          }
          return _context2.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.FORBIDDEN, false, {}, "Không thể tạo người dùng"));
        case 18:
          return _context2.abrupt("return", handleTokenAndResponse(res, user));
        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 21]]);
  }));
  return function register(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _req$body2, name, password, user, matched;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, password = _req$body2.password;
          if (!(!name || !password)) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.BAD_REQUEST, false, {}, "Please provide all information"));
        case 3:
          _context3.prev = 3;
          _context3.next = 6;
          return _userModel["default"].findOne({
            email: name
          });
        case 6:
          user = _context3.sent;
          if (user) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.NOT_FOUND, false, {}, "Tài khoản không tồn tại, vui lòng thử lại sau."));
        case 9:
          _context3.next = 11;
          return (0, _authHelper.comparePassword)(password, user.password);
        case 11:
          matched = _context3.sent;
          if (matched) {
            _context3.next = 14;
            break;
          }
          return _context3.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.NOT_ACCEPTABLE, false, {}, "Mật khẩu không chính xác, vui lòng thử lại sau."));
        case 14:
          if (user.activeStatus) {
            _context3.next = 16;
            break;
          }
          return _context3.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.NOT_ACCEPTABLE, false, {}, "Tài khoản đã bị khóa, vui lòng thử lại sau."));
        case 16:
          return _context3.abrupt("return", handleTokenAndResponse(res, user));
        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](3);
          next(_context3.t0);
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 19]]);
  }));
  return function login(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
var loginGoogle = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _req$body3, email, avatar, jti, jtiNew, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body3 = req.body, email = _req$body3.email, avatar = _req$body3.avatar, jti = _req$body3.jti, jtiNew = _req$body3.jtiNew;
          _context4.prev = 1;
          _context4.next = 4;
          return _userModel["default"].findOne({
            email: email
          });
        case 4:
          user = _context4.sent;
          if (!(user && user.jti === jti)) {
            _context4.next = 11;
            break;
          }
          user.jti = jtiNew;
          user.avatar = avatar;
          _context4.next = 10;
          return user.save();
        case 10:
          return _context4.abrupt("return", handleTokenAndResponse(res, user));
        case 11:
          return _context4.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.NOT_ACCEPTABLE, false, {}, "Could not authenticate"));
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](1);
          next(_context4.t0);
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 14]]);
  }));
  return function loginGoogle(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
var reAuth = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var token, result, user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          token = req.body.token;
          if (token) {
            _context5.next = 3;
            break;
          }
          return _context5.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.BAD_REQUEST, false, {}, "No Token Found"));
        case 3:
          _context5.prev = 3;
          _context5.next = 6;
          return _protected.protectedRoute.verifyToken(token);
        case 6:
          result = _context5.sent;
          if (result) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.BAD_REQUEST, false, {}, "Please Login Again"));
        case 9:
          _context5.next = 11;
          return _userModel["default"].findById(result._id);
        case 11:
          user = _context5.sent;
          if (!(!user || !user.activeStatus)) {
            _context5.next = 14;
            break;
          }
          return _context5.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.BAD_REQUEST, false, {}, "Could not authenticate"));
        case 14:
          return _context5.abrupt("return", handleTokenAndResponse(res, user, _httpStatusCodes.StatusCodes.OK));
        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](3);
          return _context5.abrupt("return", (0, _response.response)(res, _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, false, {}, _context5.t0.message));
        case 20:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 17]]);
  }));
  return function reAuth(_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();
var authController = {
  register: register,
  login: login,
  loginGoogle: loginGoogle,
  reAuth: reAuth
};
exports.authController = authController;