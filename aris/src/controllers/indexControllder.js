"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateData = exports.getSigData = exports.getData = exports.deleteData = exports.addData = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _slugify = _interopRequireDefault(require("slugify"));
var _slugify2 = require("../config/slugify");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var addData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(nameMess, schema, data) {
    var options,
      name,
      uniqueField,
      customSlugField,
      existingData,
      slugSource,
      newData,
      _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          options = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
          _context.prev = 1;
          name = data.name;
          uniqueField = options.uniqueField, customSlugField = options.customSlugField;
          _context.next = 6;
          return schema.findOne((0, _defineProperty2["default"])({}, uniqueField, data[uniqueField]));
        case 6:
          existingData = _context.sent;
          if (!existingData) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", {
            status: _httpStatusCodes.StatusCodes.BAD_REQUEST,
            message: "".concat(nameMess, " \u0111\xE3 t\u1ED3n t\u1EA1i!")
          });
        case 9:
          if (customSlugField) {
            slugSource = customSlugField ? data[customSlugField] : name;
            data.slug = (0, _slugify["default"])(slugSource, _slugify2.slugifyOptions);
            data.path = data.slug;
          }
          _context.next = 12;
          return new schema(data).save();
        case 12:
          newData = _context.sent;
          return _context.abrupt("return", {
            status: _httpStatusCodes.StatusCodes.CREATED,
            message: "\u0110\xE3 th\xEAm ".concat(nameMess, " th\xE0nh c\xF4ng!"),
            data: newData
          });
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          throw _context.t0;
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 16]]);
  }));
  return function addData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.addData = addData;
var updateData = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(nameMess, schema, id, data) {
    var options,
      checkData,
      rest,
      uniqueField,
      name,
      currentData,
      existingData,
      _updateData,
      newData,
      _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          options = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : {};
          checkData = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : true;
          _context2.prev = 2;
          rest = (0, _extends2["default"])({}, ((0, _objectDestructuringEmpty2["default"])(data), data));
          uniqueField = options.uniqueField;
          name = data[uniqueField];
          if (!checkData) {
            _context2.next = 18;
            break;
          }
          _context2.next = 9;
          return schema.findById(id);
        case 9:
          currentData = _context2.sent;
          if (currentData) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", {
            status: _httpStatusCodes.StatusCodes.NOT_FOUND,
            message: "".concat(nameMess, " kh\xF4ng t\u1ED3n t\u1EA1i")
          });
        case 12:
          if (!(name && name !== currentData[uniqueField])) {
            _context2.next = 18;
            break;
          }
          _context2.next = 15;
          return schema.findOne((0, _defineProperty2["default"])({}, uniqueField, name));
        case 15:
          existingData = _context2.sent;
          if (!existingData) {
            _context2.next = 18;
            break;
          }
          return _context2.abrupt("return", {
            status: _httpStatusCodes.StatusCodes.BAD_REQUEST,
            message: "T\xEAn ".concat(nameMess, " \u0111\xE3 t\u1ED3n t\u1EA1i")
          });
        case 18:
          _updateData = _objectSpread({}, rest);
          if (name) {
            _updateData.name = name;
            _updateData.slug = (0, _slugify["default"])(name, _slugify2.slugifyOptions);
          }
          _context2.next = 22;
          return schema.findOneAndUpdate({
            _id: id
          }, _updateData, {
            "new": true
          });
        case 22:
          newData = _context2.sent;
          return _context2.abrupt("return", {
            status: _httpStatusCodes.StatusCodes.OK,
            message: "C\u1EADp nh\u1EADp ".concat(nameMess, " th\xE0nh c\xF4ng!"),
            data: newData
          });
        case 26:
          _context2.prev = 26;
          _context2.t0 = _context2["catch"](2);
          throw _context2.t0;
        case 29:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 26]]);
  }));
  return function updateData(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
exports.updateData = updateData;
var deleteData = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(nameMess, schema, id) {
    var currentData;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return schema.findById(id);
        case 3:
          currentData = _context3.sent;
          if (currentData) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", {
            status: _httpStatusCodes.StatusCodes.NOT_FOUND,
            message: "".concat(nameMess, " kh\xF4ng t\u1ED3n t\u1EA1i")
          });
        case 6:
          _context3.next = 8;
          return schema.findByIdAndDelete(id);
        case 8:
          return _context3.abrupt("return", {
            status: _httpStatusCodes.StatusCodes.OK,
            message: "X\xF3a ".concat(nameMess, " th\xE0nh c\xF4ng!")
          });
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function deleteData(_x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deleteData = deleteData;
var getData = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(nameMess, schema, options) {
    var _options$populate, populate, _options$select, select, _options$sort, sort, query, allData;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _options$populate = options.populate, populate = _options$populate === void 0 ? null : _options$populate, _options$select = options.select, select = _options$select === void 0 ? null : _options$select, _options$sort = options.sort, sort = _options$sort === void 0 ? null : _options$sort;
          query = schema.find();
          if (populate) query = query.populate(populate);
          if (select) query = query.select(select);
          if (sort) query = query.sort(sort);
          _context4.next = 8;
          return query.exec();
        case 8:
          allData = _context4.sent;
          if (allData) {
            _context4.next = 11;
            break;
          }
          return _context4.abrupt("return", {
            status: _httpStatusCodes.StatusCodes.NOT_FOUND,
            message: {
              message: "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u ".concat(nameMess)
            }
          });
        case 11:
          return _context4.abrupt("return", {
            status: _httpStatusCodes.StatusCodes.OK,
            message: allData
          });
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 14]]);
  }));
  return function getData(_x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getData = getData;
var getSigData = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(nameMess, nameFind, schema) {
    var options,
      _options$populate2,
      populate,
      _options$select2,
      select,
      _options$sort2,
      sort,
      query,
      allData,
      _args5 = arguments;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          options = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
          _context5.prev = 1;
          _options$populate2 = options.populate, populate = _options$populate2 === void 0 ? null : _options$populate2, _options$select2 = options.select, select = _options$select2 === void 0 ? null : _options$select2, _options$sort2 = options.sort, sort = _options$sort2 === void 0 ? null : _options$sort2;
          query = schema.findOne(nameFind);
          if (populate) query = query.populate(populate);
          if (select) query = query.select(select);
          if (sort) query = query.sort(sort);
          _context5.next = 9;
          return query.exec();
        case 9:
          allData = _context5.sent;
          if (allData) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return", {
            status: _httpStatusCodes.StatusCodes.NOT_FOUND,
            message: {
              message: "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u ".concat(nameMess)
            }
          });
        case 12:
          return _context5.abrupt("return", {
            status: _httpStatusCodes.StatusCodes.OK,
            message: allData
          });
        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](1);
          throw _context5.t0;
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 15]]);
  }));
  return function getSigData(_x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getSigData = getSigData;