"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.provincesController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var districts = _path["default"].join(__dirname, "../json/districts.json");
var provinces = _path["default"].join(__dirname, "../json/provinces.json");
var wards = _path["default"].join(__dirname, "../json/wards.json");
var getProvinces = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            data = _fs["default"].readFileSync(provinces, 'utf8');
            res.status(200).json(JSON.parse(data));
          } catch (error) {
            next(error);
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getProvinces(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getDistricts = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var id, data, districtsData, filteredDistricts;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          try {
            id = req.params.id;
            data = _fs["default"].readFileSync(districts, 'utf8');
            districtsData = JSON.parse(data);
            filteredDistricts = districtsData.filter(function (district) {
              return district.province_code === parseInt(id);
            });
            res.status(200).json(filteredDistricts);
          } catch (error) {
            next(error);
          }
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getDistricts(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var getWards = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var id, data, wardsDataData, filteredWars;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          try {
            id = req.params.id;
            data = _fs["default"].readFileSync(wards, 'utf8');
            wardsDataData = JSON.parse(data);
            filteredWars = wardsDataData.filter(function (ward) {
              return ward.district_code === parseInt(id);
            });
            res.status(200).json(filteredWars);
          } catch (error) {
            next(error);
          }
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getWards(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var provincesController = {
  getProvinces: getProvinces,
  getDistricts: getDistricts,
  getWards: getWards
};
exports.provincesController = provincesController;