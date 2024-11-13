"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _slugify = _interopRequireDefault(require("slugify"));
var _userModel = _interopRequireDefault(require("../models/userModel.js"));
var _authHelper = require("../helpers/authHelper.js");
var _indexControllder = require("./indexControllder");
var _all = _interopRequireDefault(require("../data/all.json"));
var _path = _interopRequireDefault(require("path"));
var _xlsx = _interopRequireDefault(require("xlsx"));
var _excluded = ["page", "limit"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var nameMess = 'Người dùng';
var singleUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var id, results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          id = req.params.id;
          _context.next = 4;
          return (0, _indexControllder.getSigData)(nameMess, {
            _id: id
          }, _userModel["default"], {
            select: 'video'
          });
        case 4:
          results = _context.sent;
          res.status(results.status).json(results.message);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function singleUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var addUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, name, email, password, hashedPassword, _addUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context2.next = 4;
          return (0, _authHelper.hashPassword)(password);
        case 4:
          hashedPassword = _context2.sent;
          _context2.next = 7;
          return _userModel["default"].findOne({
            email: email
          });
        case 7:
          _context2.t0 = _context2.sent;
          if (!_context2.t0) {
            _context2.next = 10;
            break;
          }
          res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: 'Email đã tồn tại'
          });
        case 10:
          _context2.next = 12;
          return new _userModel["default"](_objectSpread(_objectSpread({}, req.body), {}, {
            password: hashedPassword,
            slug: (0, _slugify["default"])(name)
          })).save();
        case 12:
          _addUser = _context2.sent;
          res.status(_httpStatusCodes.StatusCodes.CREATED).json(_addUser);
          _context2.next = 19;
          break;
        case 16:
          _context2.prev = 16;
          _context2.t1 = _context2["catch"](0);
          next(_context2.t1);
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function addUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var allUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, skip, totalItems, _data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit;
          skip = (page - 1) * limit;
          _context3.next = 5;
          return _userModel["default"].countDocuments();
        case 5:
          totalItems = _context3.sent;
          _context3.next = 8;
          return _userModel["default"].find({}).sort({
            createdAt: -1
          }).skip(skip).limit(Number(limit)).select('-password -video -notify -avatar -gender -address -province -district -ward -dataOld -jti');
        case 8:
          _data = _context3.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            totalItems: totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: Number(page),
            newData: _data
          });
          _context3.next = 15;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return function allUser(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var searchUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _req$query2, page, limit, filters, searchCondition, skip, totalItems, _data2;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$query2 = req.query, page = _req$query2.page, limit = _req$query2.limit, filters = (0, _objectWithoutProperties2["default"])(_req$query2, _excluded);
          searchCondition = {};
          Object.keys(filters).forEach(function (key) {
            if (key !== 'page' && key !== 'limit') {
              searchCondition[key] = {
                $regex: filters[key],
                $options: 'i'
              };
            }
          });
          if (!(Object.keys(searchCondition).length === 0)) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: 'Vui lòng cung cấp điều kiện tìm kiếm.'
          }));
        case 6:
          skip = (page - 1) * limit;
          _context4.next = 9;
          return _userModel["default"].countDocuments(searchCondition);
        case 9:
          totalItems = _context4.sent;
          _context4.next = 12;
          return _userModel["default"].find(searchCondition).sort({
            createdAt: -1
          }).skip(skip).limit(Number(limit)).select('-content -edit');
        case 12:
          _data2 = _context4.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            totalItems: totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: Number(page),
            newData: _data2
          });
          _context4.next = 19;
          break;
        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 16]]);
  }));
  return function searchUser(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var id, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return (0, _indexControllder.deleteData)(nameMess, _userModel["default"], id);
        case 4:
          result = _context5.sent;
          res.status(result.status).json({
            message: result.message,
            _id: id
          });
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function deleteUser(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var updateUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var id, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _context6.next = 4;
          return (0, _indexControllder.updateData)(nameMess, _userModel["default"], id, req.body);
        case 4:
          result = _context6.sent;
          if (result.data) result.data.password = undefined;
          res.status(result.status).json({
            message: result.message,
            newData: result.data
          });
          _context6.next = 12;
          break;
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function updateUser(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var putUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var id, allowedUpdates, filteredBody, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          allowedUpdates = ['password', 'gender', 'name', 'video', 'avatar', 'address', 'province', 'district', 'ward'];
          filteredBody = Object.keys(req.body).filter(function (key) {
            return allowedUpdates.includes(key);
          }).reduce(function (obj, key) {
            obj[key] = req.body[key];
            return obj;
          }, {});
          _context7.next = 6;
          return (0, _indexControllder.updateData)(nameMess, _userModel["default"], id, filteredBody);
        case 6:
          result = _context7.sent;
          if (result.data) result.data.password = undefined;
          res.status(result.status).json({
            message: result.message,
            newData: result.data
          });
          _context7.next = 14;
          break;
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 11]]);
  }));
  return function putUser(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var putVideoUser = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var _req$body2, id, name, user, originalVideoCount;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _req$body2 = req.body, id = _req$body2.id, name = _req$body2.name;
          _context8.prev = 1;
          _context8.next = 4;
          return _userModel["default"].findById(id);
        case 4:
          user = _context8.sent;
          if (user) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.status(404).send('User not found'));
        case 7:
          originalVideoCount = user.video.length;
          user.video = user.video.filter(function (video) {
            return video.name !== name;
          });
          _context8.next = 11;
          return user.save();
        case 11:
          res.status(200).send({
            message: "".concat(originalVideoCount - user.video.length, " video(s) \u0111\xE3 \u0111\u01B0\u1EE3c x\xF3a."),
            remainingVideos: user.video
          });
          _context8.next = 17;
          break;
        case 14:
          _context8.prev = 14;
          _context8.t0 = _context8["catch"](1);
          next(_context8.t0);
        case 17:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 14]]);
  }));
  return function putVideoUser(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();
var putPassWord = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var _req$body3, userId, oldPassword, newPassword, confirmPassword, user, isMatch, hashedPassword;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$body3 = req.body, userId = _req$body3.userId, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword, confirmPassword = _req$body3.confirmPassword;
          if (!(newPassword !== confirmPassword)) {
            _context9.next = 4;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            message: 'Mật khẩu không trùng khớp'
          }));
        case 4:
          _context9.next = 6;
          return _userModel["default"].findById(userId);
        case 6:
          user = _context9.sent;
          if (user) {
            _context9.next = 9;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: 'Người dùng không tồn tại'
          }));
        case 9:
          _context9.next = 11;
          return (0, _authHelper.comparePassword)(oldPassword, user.password);
        case 11:
          isMatch = _context9.sent;
          if (isMatch) {
            _context9.next = 14;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            message: 'Mật khẩu cũ không chính xác'
          }));
        case 14:
          _context9.next = 16;
          return (0, _authHelper.hashPassword)(newPassword);
        case 16:
          hashedPassword = _context9.sent;
          user.password = hashedPassword;
          _context9.next = 20;
          return user.save();
        case 20:
          return _context9.abrupt("return", res.status(200).json({
            message: 'Đã thay đổi mật khẩu'
          }));
        case 23:
          _context9.prev = 23;
          _context9.t0 = _context9["catch"](0);
          next(_context9.t0);
        case 26:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 23]]);
  }));
  return function putPassWord(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();
var putUserForgot = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var _req$body4, email, password, verify, allowedUpdates, user, filteredBody, newVerifyCode, hashedPassword, result;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _req$body4 = req.body, email = _req$body4.email, password = _req$body4.password, verify = _req$body4.verify;
          allowedUpdates = ['password', 'verify', 'dataOld'];
          _context10.next = 5;
          return _userModel["default"].findOne({
            email: email
          });
        case 5:
          user = _context10.sent;
          if (user) {
            _context10.next = 8;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            message: 'Người dùng không tồn tại'
          }));
        case 8:
          if (!(user && user.verify === verify)) {
            _context10.next = 24;
            break;
          }
          filteredBody = Object.keys(req.body).filter(function (key) {
            return allowedUpdates.includes(key);
          }).reduce(function (obj, key) {
            obj[key] = req.body[key];
            return obj;
          }, {});
          newVerifyCode = Math.floor(100000 + Math.random() * 900000).toString();
          _context10.next = 13;
          return (0, _authHelper.hashPassword)(password);
        case 13:
          hashedPassword = _context10.sent;
          filteredBody.verify = newVerifyCode;
          filteredBody.password = hashedPassword;
          filteredBody.dataOld = false;
          _context10.next = 19;
          return (0, _indexControllder.updateData)(nameMess, _userModel["default"], user._id, filteredBody);
        case 19:
          result = _context10.sent;
          if (result.data) result.data.password = undefined;
          res.status(result.status).json({
            message: result.message,
            data: result.data
          });
          _context10.next = 25;
          break;
        case 24:
          return _context10.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_ACCEPTABLE).json({
            message: 'Mã xác nhận không đúng'
          }));
        case 25:
          _context10.next = 30;
          break;
        case 27:
          _context10.prev = 27;
          _context10.t0 = _context10["catch"](0);
          next(_context10.t0);
        case 30:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 27]]);
  }));
  return function putUserForgot(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();
var putUsernotify = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
    var id, notifyId, user;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          id = req.params.id;
          notifyId = req.body.notifyId;
          _context11.prev = 2;
          _context11.next = 5;
          return _userModel["default"].findById(id);
        case 5:
          user = _context11.sent;
          if (user) {
            _context11.next = 8;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 8:
          if (!user.notify.includes(notifyId)) {
            _context11.next = 10;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            message: 'Notification already exists'
          }));
        case 10:
          user.notify.push(notifyId);
          _context11.next = 13;
          return user.save();
        case 13:
          return _context11.abrupt("return", res.status(200).json({
            message: 'Notification updated successfully',
            newData: user
          }));
        case 16:
          _context11.prev = 16;
          _context11.t0 = _context11["catch"](2);
          next(_context11.t0);
        case 19:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[2, 16]]);
  }));
  return function putUsernotify(_x31, _x32, _x33) {
    return _ref11.apply(this, arguments);
  };
}();
var putUserVideo = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res, next) {
    var id, _req$body5, videoId, watched, watchTime, img, title, name, user, existingVideo;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          id = req.params.id;
          _req$body5 = req.body, videoId = _req$body5.videoId, watched = _req$body5.watched, watchTime = _req$body5.watchTime, img = _req$body5.img, title = _req$body5.title, name = _req$body5.name;
          _context12.prev = 2;
          _context12.next = 5;
          return _userModel["default"].findById(id);
        case 5:
          user = _context12.sent;
          if (user) {
            _context12.next = 8;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 8:
          existingVideo = user.video.find(function (video) {
            return video.videoId.toString() === videoId;
          });
          if (existingVideo) {
            existingVideo.watched = watched;
            existingVideo.watchTime = watchTime;
            existingVideo.img = img;
            existingVideo.title = title;
            existingVideo.name = name;
            existingVideo.updatedAt = Date.now();
          } else {
            user.video.push({
              videoId: videoId,
              watched: watched,
              watchTime: watchTime,
              name: name,
              title: title,
              img: img,
              createdAt: Date.now(),
              updatedAt: Date.now()
            });
          }
          _context12.next = 12;
          return user.save();
        case 12:
          res.status(200).json('UD');
          _context12.next = 18;
          break;
        case 15:
          _context12.prev = 15;
          _context12.t0 = _context12["catch"](2);
          next(_context12.t0);
        case 18:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[2, 15]]);
  }));
  return function putUserVideo(_x34, _x35, _x36) {
    return _ref12.apply(this, arguments);
  };
}();
var updateCourse = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res, next) {
    var id, user, newCourses, updatedCourses, updatedData, newData;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          id = req.params.id;
          _context13.next = 4;
          return _userModel["default"].findById(id);
        case 4:
          user = _context13.sent;
          if (user) {
            _context13.next = 7;
            break;
          }
          return _context13.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
            message: 'User not found'
          }));
        case 7:
          newCourses = req.body.courses || [];
          updatedCourses = [].concat((0, _toConsumableArray2["default"])(user.courses), (0, _toConsumableArray2["default"])(newCourses.filter(function (courseId) {
            return !user.courses.some(function (existingCourseId) {
              return existingCourseId.equals(courseId);
            });
          })));
          updatedData = _objectSpread(_objectSpread({}, req.body), {}, {
            courses: updatedCourses
          });
          _context13.next = 12;
          return _userModel["default"].findByIdAndUpdate(id, updatedData, {
            "new": true
          });
        case 12:
          newData = _context13.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json(newData);
          _context13.next = 19;
          break;
        case 16:
          _context13.prev = 16;
          _context13.t0 = _context13["catch"](0);
          next(_context13.t0);
        case 19:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 16]]);
  }));
  return function updateCourse(_x37, _x38, _x39) {
    return _ref13.apply(this, arguments);
  };
}();
var putCoursesByEmail = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res, next) {
    var _req$body6, email, courses, updatedUsers;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _req$body6 = req.body, email = _req$body6.email, courses = _req$body6.courses;
          if (!(!Array.isArray(email) || !Array.isArray(courses))) {
            _context15.next = 4;
            break;
          }
          return _context15.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: 'Invalid input format'
          }));
        case 4:
          _context15.next = 6;
          return Promise.all(email.map( /*#__PURE__*/function () {
            var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(userEmail) {
              var user, updatedCourses, updatedUser;
              return _regenerator["default"].wrap(function _callee14$(_context14) {
                while (1) switch (_context14.prev = _context14.next) {
                  case 0:
                    _context14.next = 2;
                    return _userModel["default"].findOne({
                      email: userEmail
                    });
                  case 2:
                    user = _context14.sent;
                    if (user) {
                      _context14.next = 5;
                      break;
                    }
                    return _context14.abrupt("return", {
                      email: userEmail,
                      status: 'not found'
                    });
                  case 5:
                    updatedCourses = [].concat((0, _toConsumableArray2["default"])(user.courses), (0, _toConsumableArray2["default"])(courses.filter(function (courseId) {
                      return !user.courses.some(function (existingCourseId) {
                        return existingCourseId.equals(courseId);
                      });
                    })));
                    _context14.next = 8;
                    return _userModel["default"].findByIdAndUpdate(user._id, {
                      courses: updatedCourses
                    }, {
                      "new": true
                    });
                  case 8:
                    updatedUser = _context14.sent;
                    return _context14.abrupt("return", {
                      email: userEmail,
                      status: 'updated',
                      user: updatedUser
                    });
                  case 10:
                  case "end":
                    return _context14.stop();
                }
              }, _callee14);
            }));
            return function (_x43) {
              return _ref15.apply(this, arguments);
            };
          }()));
        case 6:
          updatedUsers = _context15.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json(updatedUsers);
          _context15.next = 13;
          break;
        case 10:
          _context15.prev = 10;
          _context15.t0 = _context15["catch"](0);
          next(_context15.t0);
        case 13:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 10]]);
  }));
  return function putCoursesByEmail(_x40, _x41, _x42) {
    return _ref14.apply(this, arguments);
  };
}();
var checkEmail = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res, next) {
    var email, user;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          email = req.body.email;
          if (email) {
            _context16.next = 3;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            message: 'Email is required'
          }));
        case 3:
          _context16.prev = 3;
          _context16.next = 6;
          return _userModel["default"].findOne({
            email: email
          });
        case 6:
          user = _context16.sent;
          if (!user) {
            _context16.next = 11;
            break;
          }
          return _context16.abrupt("return", res.status(200).json({
            exists: true,
            jti: user.jti
          }));
        case 11:
          return _context16.abrupt("return", res.status(200).json({
            exists: false
          }));
        case 12:
          _context16.next = 17;
          break;
        case 14:
          _context16.prev = 14;
          _context16.t0 = _context16["catch"](3);
          next(_context16.t0);
        case 17:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[3, 14]]);
  }));
  return function checkEmail(_x44, _x45, _x46) {
    return _ref16.apply(this, arguments);
  };
}();
var checkDataOld = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res, next) {
    var email, user;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          email = req.body.email;
          if (email) {
            _context17.next = 3;
            break;
          }
          return _context17.abrupt("return", res.status(400).json({
            message: 'Email is required'
          }));
        case 3:
          _context17.prev = 3;
          _context17.next = 6;
          return _userModel["default"].findOne({
            email: email
          });
        case 6:
          user = _context17.sent;
          return _context17.abrupt("return", res.status(200).json(user.dataOld));
        case 10:
          _context17.prev = 10;
          _context17.t0 = _context17["catch"](3);
          next(_context17.t0);
        case 13:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[3, 10]]);
  }));
  return function checkDataOld(_x47, _x48, _x49) {
    return _ref17.apply(this, arguments);
  };
}();
var checkCodeEmail = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res, next) {
    var _req$body7, email, verify, user;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _req$body7 = req.body, email = _req$body7.email, verify = _req$body7.verify;
          _context18.prev = 1;
          _context18.next = 4;
          return _userModel["default"].findOne({
            email: email
          });
        case 4:
          user = _context18.sent;
          if (!(user && user.verify === verify)) {
            _context18.next = 9;
            break;
          }
          return _context18.abrupt("return", res.status(200).json({
            exists: true
          }));
        case 9:
          return _context18.abrupt("return", res.status(200).json({
            exists: false
          }));
        case 10:
          _context18.next = 15;
          break;
        case 12:
          _context18.prev = 12;
          _context18.t0 = _context18["catch"](1);
          next(_context18.t0);
        case 15:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[1, 12]]);
  }));
  return function checkCodeEmail(_x50, _x51, _x52) {
    return _ref18.apply(this, arguments);
  };
}();
var dataUser = /*#__PURE__*/function () {
  var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(req, res, next) {
    var emailMap, courseMapping, result;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          emailMap = new Map();
          courseMapping = {
            "47071d74-e0e2-401e-b9d5-53b20ed705f8": "66f4af27746fafa3ca05767a",
            "67d4211a-9af4-4114-aa63-ea6649dcf736": "66ea982481abd5e66b7166fc",
            "3c66d715-45c4-4ec7-b392-6ead04699cc9": "66ed4e929e69e76c7aae27b0"
          }; // Lọc dữ liệu
          _all["default"].forEach(function (item) {
            var email = item.email,
              courses = item.courses;

            // Kiểm tra xem email đã tồn tại chưa
            if (!emailMap.has(email)) {
              // Chỉ lưu lại đối tượng nếu email chưa tồn tại
              emailMap.set(email, _objectSpread({}, item));
            }
          });
          result = Array.from(emailMap.values()).map(function (item) {
            var formattedCourses = item.courses.map(function (courseId) {
              return courseMapping[courseId];
            }).filter(Boolean);
            return {
              name: item.name,
              slug: (0, _slugify["default"])(item.name),
              email: item.email,
              phone: item.phone,
              courses: formattedCourses,
              userType: 'user',
              password: 'ARISNBTN@123',
              dataOld: true
            };
          });
          _context19.next = 7;
          return _userModel["default"].insertMany(result);
        case 7:
          res.status(200).json(result);
          _context19.next = 13;
          break;
        case 10:
          _context19.prev = 10;
          _context19.t0 = _context19["catch"](0);
          next(_context19.t0);
        case 13:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 10]]);
  }));
  return function dataUser(_x53, _x54, _x55) {
    return _ref19.apply(this, arguments);
  };
}();
var userController = {
  addUser: addUser,
  allUser: allUser,
  putVideoUser: putVideoUser,
  singleUser: singleUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  putUser: putUser,
  putUsernotify: putUsernotify,
  putUserForgot: putUserForgot,
  updateCourse: updateCourse,
  putUserVideo: putUserVideo,
  checkEmail: checkEmail,
  checkCodeEmail: checkCodeEmail,
  searchUser: searchUser,
  putCoursesByEmail: putCoursesByEmail,
  dataUser: dataUser,
  checkDataOld: checkDataOld,
  putPassWord: putPassWord
};
exports.userController = userController;