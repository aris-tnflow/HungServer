"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var uploadDir = _path["default"].join(__dirname, '../public/uploads/contacts');
var get = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var filename, filePath, fileContent, jsonData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          filename = req.params.filename;
          if (filename) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Filename is required.'
          }));
        case 4:
          filePath = _path["default"].join(uploadDir, "".concat(filename, ".json"));
          if (_fs["default"].existsSync(filePath)) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: 'File does not exist.'
          }));
        case 7:
          fileContent = _fs["default"].readFileSync(filePath, 'utf-8');
          jsonData = JSON.parse(fileContent);
          res.status(200).json({
            message: 'File retrieved successfully.',
            data: jsonData
          });
          _context.next = 15;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function get(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var add = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var filename, filePath;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          filename = req.body.filename;
          if (filename) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Filename is required.'
          }));
        case 4:
          if (!_fs["default"].existsSync(uploadDir)) {
            _fs["default"].mkdirSync(uploadDir, {
              recursive: true
            });
          }
          filePath = _path["default"].join(uploadDir, "".concat(filename, ".json"));
          _fs["default"].writeFileSync(filePath, '{}', 'utf-8');
          res.status(200).json({
            message: 'File created successfully.',
            filePath: filePath
          });
          _context2.next = 13;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function add(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var put = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _req$body, filename, data, filePath, newArray, fileContent, jsonData;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, filename = _req$body.filename, data = _req$body.data;
          if (!(!filename || !data)) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Filename and data are required.'
          }));
        case 4:
          if (!_fs["default"].existsSync(uploadDir)) {
            _fs["default"].mkdirSync(uploadDir, {
              recursive: true
            });
          }
          filePath = _path["default"].join(uploadDir, "".concat(filename, ".json"));
          if (_fs["default"].existsSync(filePath)) {
            _context3.next = 10;
            break;
          }
          newArray = [_objectSpread(_objectSpread({}, data), {}, {
            "Ngày tạo": new Date(),
            "Cập nhập": new Date()
          })]; // Tạo mảng mới chứa dữ liệu
          _fs["default"].writeFileSync(filePath, JSON.stringify(newArray, null, 2), 'utf-8');
          return _context3.abrupt("return", res.status(200).json({
            message: 'File created and data saved successfully.',
            filePath: filePath
          }));
        case 10:
          fileContent = _fs["default"].readFileSync(filePath, 'utf-8');
          jsonData = JSON.parse(fileContent);
          if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
          }
          jsonData.push(_objectSpread(_objectSpread({}, data), {}, {
            "Ngày tạo": new Date().toLocaleString('vi-VN', {
              timeZone: 'Asia/Ho_Chi_Minh'
            }),
            "Cập nhập": new Date().toLocaleString('vi-VN', {
              timeZone: 'Asia/Ho_Chi_Minh'
            })
          }));
          _fs["default"].writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
          res.status(200).json({
            message: 'File updated successfully.',
            filePath: filePath
          });
          _context3.next = 21;
          break;
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function put(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var del = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _req$body2, filename, _id, filePath, data, updatedData;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, filename = _req$body2.filename, _id = _req$body2._id;
          if (!(!filename || !_id)) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Filename and _id are required.'
          }));
        case 4:
          filePath = _path["default"].join(uploadDir, "".concat(filename, ".json"));
          if (_fs["default"].existsSync(filePath)) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'File does not exist.'
          }));
        case 7:
          // Đọc dữ liệu từ file JSON
          data = JSON.parse(_fs["default"].readFileSync(filePath, 'utf-8')); // Lọc bỏ phần tử có _id khớp
          updatedData = data.filter(function (item) {
            return item._id !== _id;
          }); // Ghi dữ liệu đã cập nhật vào file JSON
          _fs["default"].writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');
          res.status(200).json({
            message: 'Item deleted successfully from the file.'
          });
          _context4.next = 16;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return function del(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var contactController = {
  get: get,
  add: add,
  put: put,
  del: del
};
exports.contactController = contactController;