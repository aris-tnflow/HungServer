"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluginsController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _pluginsModel = _interopRequireDefault(require("../models/pluginsModel"));
var _jsPluginsModel = _interopRequireDefault(require("../models/jsPluginsModel"));
var _cssPluginsModel = _interopRequireDefault(require("../models/cssPluginsModel"));
var _path = _interopRequireDefault(require("path"));
var _indexControllder = require("./indexControllder");
var nameMess = 'Plugins';
var addFileEV = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var files, promises;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          files = req.files;
          promises = files.map( /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file) {
              var extension;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    extension = _path["default"].extname(file.originalname).toLowerCase();
                    if (!(extension === '.css')) {
                      _context.next = 6;
                      break;
                    }
                    _context.next = 4;
                    return _cssPluginsModel["default"].create({
                      link: "/plugins/ev/".concat(file.filename)
                    });
                  case 4:
                    _context.next = 12;
                    break;
                  case 6:
                    if (!(extension === '.js')) {
                      _context.next = 11;
                      break;
                    }
                    _context.next = 9;
                    return _jsPluginsModel["default"].create({
                      link: "/plugins/ev/".concat(file.filename)
                    });
                  case 9:
                    _context.next = 12;
                    break;
                  case 11:
                    throw new Error("Unsupported file type: ".concat(extension));
                  case 12:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x4) {
              return _ref2.apply(this, arguments);
            };
          }());
          _context2.next = 5;
          return Promise.all(promises);
        case 5:
          res.status(_httpStatusCodes.StatusCodes.CREATED).json({
            message: 'Files uploaded successfully'
          });
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function addFileEV(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var addFilePlugins = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          try {
            res.status(200).json({
              message: "Đã thêm plugins",
              src: "/plugins/".concat(req.file.filename)
            });
          } catch (error) {
            next(error);
          }
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function addFilePlugins(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var all = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, skip, totalItems, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit;
          skip = (page - 1) * limit;
          _context4.next = 5;
          return _pluginsModel["default"].countDocuments();
        case 5:
          totalItems = _context4.sent;
          _context4.next = 8;
          return _pluginsModel["default"].find({}).sort({
            order: -1
          }).skip(skip).limit(Number(limit));
        case 8:
          data = _context4.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            totalItems: totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: Number(page),
            newData: data
          });
          _context4.next = 15;
          break;
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 12]]);
  }));
  return function all(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
var add = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _indexControllder.addData)(nameMess, _pluginsModel["default"], req.body, {
            uniqueField: 'id'
          });
        case 3:
          result = _context5.sent;
          res.status(result.status).json({
            message: result.message,
            newData: result.data
          });
          _context5.next = 10;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function add(_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();
var put = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var id, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _context6.next = 4;
          return (0, _indexControllder.updateData)(nameMess, _pluginsModel["default"], id, req.body, {
            uniqueField: 'id'
          });
        case 4:
          result = _context6.sent;
          res.status(result.status).json({
            message: result.message,
            newData: result.data
          });
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function put(_x14, _x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}();
var del = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var id, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _context7.next = 4;
          return (0, _indexControllder.deleteData)(nameMess, _pluginsModel["default"], id);
        case 4:
          result = _context7.sent;
          res.status(result.status).json({
            message: result.message,
            _id: id
          });
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return function del(_x17, _x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();
var pluginsController = {
  addFileEV: addFileEV,
  addFilePlugins: addFilePlugins,
  all: all,
  del: del,
  add: add,
  put: put
};
exports.pluginsController = pluginsController;