"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maronryController = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _slugify = _interopRequireDefault(require("slugify"));
var _masonryModel = _interopRequireDefault(require("../models/masonryModel.js"));
var _slugify2 = require("../config/slugify");
var _indexControllder = require("./indexControllder");
var _excluded = ["name"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var nameMess = 'Masonry';
var sigMasonry = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var slug, results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          slug = req.params.slug; // const allCourser = await getSigData(nameMess, slug, masonrySchema, { select: '_id name img' });
          // res.status(StatusCodes.OK).json(allCourser);
          _context.next = 4;
          return (0, _indexControllder.getSigData)(nameMess, {
            slug: slug
          }, _masonryModel["default"], {
            select: '_id name img'
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
  return function sigMasonry(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var addMasonry = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _indexControllder.addData)(nameMess, _masonryModel["default"], req.body, {
            uniqueField: 'name',
            customSlugField: 'name'
          });
        case 3:
          result = _context2.sent;
          res.status(result.status).json(result.data);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function addMasonry(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var putMasonry = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var slug, _req$body, name, rest, currentCourse, existingCourse, _updateData, _slug, newdata;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          slug = req.params.slug;
          _req$body = req.body, name = _req$body.name, rest = (0, _objectWithoutProperties2["default"])(_req$body, _excluded);
          _context3.next = 5;
          return _masonryModel["default"].findOne({
            slug: slug
          });
        case 5:
          currentCourse = _context3.sent;
          if (currentCourse) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
            message: 'Trang không tồn tại'
          }));
        case 8:
          if (!(name && name !== currentCourse.name)) {
            _context3.next = 14;
            break;
          }
          _context3.next = 11;
          return _masonryModel["default"].findOne({
            name: name
          });
        case 11:
          existingCourse = _context3.sent;
          if (!existingCourse) {
            _context3.next = 14;
            break;
          }
          return _context3.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: 'Tên trang đã tồn tại'
          }));
        case 14:
          _updateData = _objectSpread({}, rest);
          if (name) {
            _slug = (0, _slugify["default"])(name, _slugify2.slugifyOptions);
            _updateData.name = name;
            _updateData.slug = _slug;
          }
          _context3.next = 18;
          return _masonryModel["default"].findOneAndUpdate({
            slug: slug
          }, _updateData, {
            "new": true
          });
        case 18:
          newdata = _context3.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            message: 'Cập nhập Trang thành công!',
            newData: newdata
          });
          _context3.next = 25;
          break;
        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 22]]);
  }));
  return function putMasonry(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var delMasonry = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var slug;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          slug = req.params.slug;
          _context4.next = 4;
          return _masonryModel["default"].findOneAndDelete({
            slug: slug
          });
        case 4:
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            message: 'Đã xóa trang thành công!'
          });
          _context4.next = 10;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function delMasonry(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var maronryController = {
  sigMasonry: sigMasonry,
  addMasonry: addMasonry,
  putMasonry: putMasonry,
  delMasonry: delMasonry
};
exports.maronryController = maronryController;