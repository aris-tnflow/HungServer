"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderController = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _orderModel = _interopRequireDefault(require("../models/orderModel"));
var _indexControllder = require("./indexControllder");
var _httpStatusCodes = require("http-status-codes");
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _setting = _interopRequireDefault(require("../json/setting.json"));
var _nodeCron = _interopRequireDefault(require("node-cron"));
var _path = _interopRequireDefault(require("path"));
var _xlsx = _interopRequireDefault(require("xlsx"));
var _dateFns = require("date-fns");
var _excluded = ["page", "limit"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var nameMess = 'Đơn hàng';
var time = _setting["default"]["order"].time;
var addOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _indexControllder.addData)(nameMess, _orderModel["default"], req.body, {
            uniqueField: 'orderId'
          });
        case 3:
          result = _context.sent;
          res.status(result.status).json({
            message: result.message,
            newData: result.data
          });
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
  return function addOrder(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var allOrder = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, skip, totalItems, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit;
          skip = (page - 1) * limit;
          _context2.next = 5;
          return _orderModel["default"].countDocuments();
        case 5:
          totalItems = _context2.sent;
          _context2.next = 8;
          return _orderModel["default"].find({}).sort({
            createdAt: -1
          }).skip(skip).limit(Number(limit));
        case 8:
          data = _context2.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            totalItems: totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: Number(page),
            newData: data
          });
          _context2.next = 15;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function allOrder(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var sigOrder = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _id, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _id = req.params.id;
          _context3.next = 4;
          return _orderModel["default"].find({
            idUser: _id
          });
        case 4:
          result = _context3.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json(result);
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function sigOrder(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var delOrder = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _id2, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _id2 = req.params.id;
          _context4.next = 4;
          return (0, _indexControllder.deleteData)(nameMess, _orderModel["default"], _id2);
        case 4:
          result = _context4.sent;
          res.status(result.status).json({
            message: result.message,
            _id: _id2
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
  return function delOrder(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var searchOrder = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var _req$query2, _req$query2$page, page, _req$query2$limit, limit, filters, searchCondition, skip, totalItems, data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$query2 = req.query, _req$query2$page = _req$query2.page, page = _req$query2$page === void 0 ? 1 : _req$query2$page, _req$query2$limit = _req$query2.limit, limit = _req$query2$limit === void 0 ? 50 : _req$query2$limit, filters = (0, _objectWithoutProperties2["default"])(_req$query2, _excluded);
          searchCondition = {};
          Object.keys(filters).forEach(function (key) {
            if (key !== 'page' && key !== 'limit') {
              if (filters[key] === 'true' || filters[key] === 'false') {
                searchCondition[key] = filters[key] === 'true';
              } else {
                searchCondition[key] = {
                  $regex: filters[key],
                  $options: 'i'
                };
              }
            }
          });
          if (!(Object.keys(searchCondition).length === 0)) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: 'Vui lòng cung cấp điều kiện tìm kiếm.'
          }));
        case 6:
          skip = (page - 1) * limit;
          _context5.next = 9;
          return _orderModel["default"].countDocuments(searchCondition);
        case 9:
          totalItems = _context5.sent;
          _context5.next = 12;
          return _orderModel["default"].find(searchCondition).sort({
            createdAt: -1
          }).skip(skip).limit(Number(limit));
        case 12:
          data = _context5.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            totalItems: totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: Number(page),
            newData: data
          });
          _context5.next = 19;
          break;
        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 19:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 16]]);
  }));
  return function searchOrder(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var getOrderByOrderId = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var orderId, order;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          orderId = req.params.orderId;
          _context6.next = 4;
          return _orderModel["default"].findOne({
            id: id,
            status: true
          });
        case 4:
          order = _context6.sent;
          if (order) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
            message: 'Order not found or status is not true'
          }));
        case 7:
          res.status(_httpStatusCodes.StatusCodes.OK).json(order);
          _context6.next = 13;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function getOrderByOrderId(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var putOrderByOrderId = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var orderId, _req$body, urlPayment, idOrderNew, order, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          orderId = req.params.orderId;
          _req$body = req.body, urlPayment = _req$body.urlPayment, idOrderNew = _req$body.idOrderNew;
          _context7.next = 5;
          return _orderModel["default"].findOne({
            orderId: orderId
          });
        case 5:
          order = _context7.sent;
          if (order) {
            _context7.next = 8;
            break;
          }
          return _context7.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
            message: 'Order not found'
          }));
        case 8:
          order.orderId = idOrderNew;
          order.urlPayment = urlPayment;
          _context7.next = 12;
          return order.save();
        case 12:
          result = _context7.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json(result);
          _context7.next = 19;
          break;
        case 16:
          _context7.prev = 16;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);
        case 19:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 16]]);
  }));
  return function putOrderByOrderId(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var delUnpaidOrders = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _orderModel["default"].deleteMany({
            status: false
          });
        case 3:
          result = _context8.sent;
          if (!(result.deletedCount > 0)) {
            _context8.next = 8;
            break;
          }
          return _context8.abrupt("return", res.status(200).json({
            message: "".concat(result.deletedCount, " \u0111\u01A1n h\xE0ng ch\u01B0a thanh to\xE1n \u0111\xE3 \u0111\u01B0\u1EE3c x\xF3a.")
          }));
        case 8:
          return _context8.abrupt("return", res.status(404).json({
            message: 'Không tìm thấy đơn hàng nào chưa thanh toán.'
          }));
        case 9:
          _context8.next = 14;
          break;
        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 11]]);
  }));
  return function delUnpaidOrders(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();
var putOrder = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var _id3, newData;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _id3 = req.params.id;
          _context9.next = 4;
          return _orderModel["default"].findOneAndUpdate({
            orderId: _id3
          }, req.body, {
            "new": true
          });
        case 4:
          newData = _context9.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json(newData);
          _context9.next = 11;
          break;
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          next(_context9.t0);
        case 11:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 8]]);
  }));
  return function putOrder(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();
var checkOrder = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var _req$body2, _id4, product, data, orders, isSameProductList, _iterator, _step, order;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _req$body2 = req.body, _id4 = _req$body2.id, product = _req$body2.product, data = _req$body2.data;
          if (!(!_id4 || !product || !Array.isArray(product))) {
            _context10.next = 4;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            message: 'Invalid input'
          }));
        case 4:
          _context10.next = 6;
          return _orderModel["default"].find({
            idUser: _id4
          });
        case 6:
          orders = _context10.sent;
          if (!(!orders || orders.length === 0)) {
            _context10.next = 9;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            message: 'No orders found for this user'
          }));
        case 9:
          isSameProductList = function isSameProductList(products1, products2) {
            if (products1.length !== products2.length) return false;
            products1.sort(function (a, b) {
              return a.id.localeCompare(b.id);
            });
            products2.sort(function (a, b) {
              return a.id.localeCompare(b.id);
            });
            for (var i = 0; i < products1.length; i++) {
              if (products1[i].id !== products2[i].id || products1[i].quantity !== products2[i].quantity || products1[i].price !== products2[i].price) {
                return false;
              }
            }
            return true;
          };
          _iterator = _createForOfIteratorHelper(orders);
          _context10.prev = 11;
          _iterator.s();
        case 13:
          if ((_step = _iterator.n()).done) {
            _context10.next = 21;
            break;
          }
          order = _step.value;
          if (!isSameProductList(order.product, product)) {
            _context10.next = 19;
            break;
          }
          _context10.next = 18;
          return _orderModel["default"].updateOne({
            orderId: order.orderId
          }, _objectSpread({}, data));
        case 18:
          return _context10.abrupt("return", res.status(200).json(order));
        case 19:
          _context10.next = 13;
          break;
        case 21:
          _context10.next = 26;
          break;
        case 23:
          _context10.prev = 23;
          _context10.t0 = _context10["catch"](11);
          _iterator.e(_context10.t0);
        case 26:
          _context10.prev = 26;
          _iterator.f();
          return _context10.finish(26);
        case 29:
          return _context10.abrupt("return", res.status(404).json({
            message: 'No matching orders found'
          }));
        case 32:
          _context10.prev = 32;
          _context10.t1 = _context10["catch"](0);
          next(_context10.t1);
        case 35:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 32], [11, 23, 26, 29]]);
  }));
  return function checkOrder(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();
var dataOrder = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
    var filePath, workbook, sheetName, worksheet, rawData, formattedData;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          filePath = _path["default"].join(__dirname, '../data/DanhSachHoaDon.xlsx');
          workbook = _xlsx["default"].readFile(filePath);
          sheetName = workbook.SheetNames[0];
          worksheet = workbook.Sheets[sheetName];
          rawData = _xlsx["default"].utils.sheet_to_json(worksheet);
          formattedData = rawData.map(function (user) {
            return {
              orderId: user['Mã hóa đơn'] || '',
              name: "".concat(user['Họ'], " ").concat(user['Tên']) || '',
              email: user['Email'] || '',
              phone: user['SĐT'] || '',
              province: user['Thành phố'] || '',
              district: user['Quận/Huyện'] || '',
              ward: user['Phường/Xã'] || '',
              address: user['Địa chỉ'] || '',
              status: true,
              paymentMethod: "Chuyển Khoản Ngân Hàng",
              product: [{
                id: user['Mã hóa đơn'] || '',
                name: user['Khóa học'] || '',
                price: user['Giá'] ? parseInt(user['Giá'].replace(/,/g, '')) : '',
                quantity: 1
              }]
            };
          });
          _context11.next = 9;
          return _orderModel["default"].insertMany(formattedData);
        case 9:
          res.status(200).json(formattedData);
          _context11.next = 15;
          break;
        case 12:
          _context11.prev = 12;
          _context11.t0 = _context11["catch"](0);
          next(_context11.t0);
        case 15:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 12]]);
  }));
  return function dataOrder(_x31, _x32, _x33) {
    return _ref11.apply(this, arguments);
  };
}();
var totalRevenue = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res, next) {
    var orders, _totalRevenue;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return _orderModel["default"].find({
            status: true
          });
        case 3:
          orders = _context12.sent;
          _totalRevenue = orders.reduce(function (sum, order) {
            return sum + order.product.reduce(function (productSum, item) {
              return productSum + item.price * item.quantity;
            }, 0);
          }, 0);
          res.json(_totalRevenue);
          _context12.next = 11;
          break;
        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](0);
          next(_context12.t0);
        case 11:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 8]]);
  }));
  return function totalRevenue(_x34, _x35, _x36) {
    return _ref12.apply(this, arguments);
  };
}();
var totalWeeklyRevenue = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res, next) {
    var startDate, endDate, orders, weeklyRevenue;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          startDate = (0, _dateFns.startOfWeek)(new Date(), {
            weekStartsOn: 1
          });
          endDate = (0, _dateFns.endOfWeek)(new Date(), {
            weekStartsOn: 1
          });
          _context13.next = 5;
          return _orderModel["default"].find({
            status: true,
            createdAt: {
              $gte: startDate,
              $lte: endDate
            }
          });
        case 5:
          orders = _context13.sent;
          weeklyRevenue = orders.reduce(function (sum, order) {
            return sum + order.product.reduce(function (productSum, item) {
              return productSum + item.price * item.quantity;
            }, 0);
          }, 0);
          res.json(weeklyRevenue);
          _context13.next = 13;
          break;
        case 10:
          _context13.prev = 10;
          _context13.t0 = _context13["catch"](0);
          next(_context13.t0);
        case 13:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 10]]);
  }));
  return function totalWeeklyRevenue(_x37, _x38, _x39) {
    return _ref13.apply(this, arguments);
  };
}();
var stats = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res, next) {
    var todayStart, todayEnd, startDate, endDate, totalOrders, paidOrdersToday, unpaidOrdersToday, newUsersThisWeek, totalUsers, paidOrdersThisWeek;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          todayStart = new Date();
          todayStart.setHours(0, 0, 0, 0);
          todayEnd = new Date();
          todayEnd.setHours(23, 59, 59, 999);
          startDate = (0, _dateFns.startOfWeek)(new Date(), {
            weekStartsOn: 1
          });
          endDate = (0, _dateFns.endOfWeek)(new Date(), {
            weekStartsOn: 1
          }); // Tổng đơn đặt hàng
          _context14.next = 9;
          return _orderModel["default"].countDocuments();
        case 9:
          totalOrders = _context14.sent;
          _context14.next = 12;
          return _orderModel["default"].countDocuments({
            status: true,
            createdAt: {
              $gte: todayStart,
              $lte: todayEnd
            }
          });
        case 12:
          paidOrdersToday = _context14.sent;
          _context14.next = 15;
          return _orderModel["default"].countDocuments({
            status: false,
            createdAt: {
              $gte: todayStart,
              $lte: todayEnd
            }
          });
        case 15:
          unpaidOrdersToday = _context14.sent;
          _context14.next = 18;
          return _userModel["default"].countDocuments({
            createdAt: {
              $gte: startDate,
              $lte: endDate
            }
          });
        case 18:
          newUsersThisWeek = _context14.sent;
          _context14.next = 21;
          return _userModel["default"].countDocuments();
        case 21:
          totalUsers = _context14.sent;
          _context14.next = 24;
          return _orderModel["default"].countDocuments({
            status: true,
            createdAt: {
              $gte: startDate,
              $lte: endDate
            }
          });
        case 24:
          paidOrdersThisWeek = _context14.sent;
          res.json({
            totalOrders: totalOrders,
            paidOrdersToday: paidOrdersToday,
            unpaidOrdersToday: unpaidOrdersToday,
            newUsersThisWeek: newUsersThisWeek,
            totalUsers: totalUsers,
            paidOrdersThisWeek: paidOrdersThisWeek
          });
          _context14.next = 31;
          break;
        case 28:
          _context14.prev = 28;
          _context14.t0 = _context14["catch"](0);
          next(_context14.t0);
        case 31:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 28]]);
  }));
  return function stats(_x40, _x41, _x42) {
    return _ref14.apply(this, arguments);
  };
}();
_nodeCron["default"].schedule(time, /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
  var req, res, next;
  return _regenerator["default"].wrap(function _callee15$(_context15) {
    while (1) switch (_context15.prev = _context15.next) {
      case 0:
        // Tạo các đối tượng giả cho req, res, và next
        req = {}; // Tùy chỉnh theo yêu cầu của hàm delUnpaidOrders
        res = {
          status: function status() {
            return res;
          },
          json: function json() {
            return res;
          }
        };
        next = function next(err) {
          if (err) {
            console.error('Lỗi khi thực hiện backup tự động:', err);
          }
        };
        _context15.prev = 3;
        _context15.next = 6;
        return delUnpaidOrders(req, res, next);
      case 6:
        _context15.next = 11;
        break;
      case 8:
        _context15.prev = 8;
        _context15.t0 = _context15["catch"](3);
        console.error('Lỗi khi thực hiện backup tự động:', _context15.t0);
      case 11:
      case "end":
        return _context15.stop();
    }
  }, _callee15, null, [[3, 8]]);
})), {
  timezone: 'Asia/Ho_Chi_Minh'
});
var orderController = {
  totalRevenue: totalRevenue,
  totalWeeklyRevenue: totalWeeklyRevenue,
  stats: stats,
  addOrder: addOrder,
  allOrder: allOrder,
  delOrder: delOrder,
  putOrder: putOrder,
  sigOrder: sigOrder,
  searchOrder: searchOrder,
  delUnpaidOrders: delUnpaidOrders,
  putOrderByOrderId: putOrderByOrderId,
  getOrderByOrderId: getOrderByOrderId,
  dataOrder: dataOrder,
  checkOrder: checkOrder
};
exports.orderController = orderController;