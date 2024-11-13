"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bankController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _indexControllder = require("./indexControllder");
var _bankModel = _interopRequireDefault(require("../models/bankModel"));
var nameMess = 'Key Bank';
var get = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var allData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _bankModel["default"].find({}).sort({
            createdAt: -1
          }).select('nameAccount account name');
        case 3:
          allData = _context.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json(allData);
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function get(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getAmin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var allData;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _bankModel["default"].find({}).sort({
            createdAt: -1
          });
        case 3:
          allData = _context2.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            newData: allData
          });
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
  return function getAmin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var add = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _indexControllder.addData)(nameMess, _bankModel["default"], req.body);
        case 3:
          result = _context3.sent;
          res.status(result.status).json({
            message: result.message,
            newData: result.data
          });
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function add(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var put = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var id, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return (0, _indexControllder.updateData)(nameMess, _bankModel["default"], id, req.body);
        case 4:
          result = _context4.sent;
          res.status(result.status).json({
            message: result.message,
            newData: result.data
          });
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function put(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var bankController = {
  getAmin: getAmin,
  get: get,
  add: add,
  put: put
};
exports.bankController = bankController;