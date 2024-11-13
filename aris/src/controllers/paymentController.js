"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _orderModel = _interopRequireDefault(require("../models/orderModel"));
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _axios = _interopRequireDefault(require("axios"));
var _crypto = _interopRequireDefault(require("crypto"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _moment = _interopRequireDefault(require("moment"));
var _cryptoJs = _interopRequireDefault(require("crypto-js"));
var _qs = _interopRequireDefault(require("qs"));
var _node = _interopRequireDefault(require("@payos/node"));
var _setting = _interopRequireDefault(require("../json/setting.json"));
var _crypto2 = require("../utils/crypto");
// Zalopay

// VNPay
// import config from 'config';
// import dateFormat from 'dateformat';
// VietQR
var _setting$paymentBank = _setting["default"]["payment-bank"],
  clientID = _setting$paymentBank.clientID,
  apiKey = _setting$paymentBank.apiKey,
  checksumKey = _setting$paymentBank.checksumKey;
var YOUR_CLIENT_ID = '7de09ded-b671-4cdd-9c7c-ee56416f15be';
var YOUR_API_KEY = '8195937f-acc1-4fa5-b6ed-e8f3bafb9f7e';
var YOUR_CHECKSUM_KEY = 'dad2de38dff40c99344ce28ca6a0ae7950bbd5fa8d7e88082f701d139e78fb37';
var payOS = new _node["default"]((0, _crypto2.decrypt)(clientID), (0, _crypto2.decrypt)(apiKey), (0, _crypto2.decrypt)(checksumKey));
var payWithMoMo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function payWithMoMo(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var payWithZaloPay = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function payWithZaloPay(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var payWithVNPay = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function payWithVNPay(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var createQRPayment = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _req$body, BANKID, ACCOUNT, PRICE, DESCRIPTION, QuickLink;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          // {
          //     "BANKID": "970422",
          //     "ACCOUNT": "0918685740",
          //     "PRICE": "1000",
          //     "DESCRIPTION": "HAHA"
          // }
          _req$body = req.body, BANKID = _req$body.BANKID, ACCOUNT = _req$body.ACCOUNT, PRICE = _req$body.PRICE, DESCRIPTION = _req$body.DESCRIPTION;
          QuickLink = "https://img.vietqr.io/image/".concat(BANKID, "-").concat(ACCOUNT, "-compact2.png?amount=").concat(PRICE, "&addInfo=").concat(DESCRIPTION);
          _context4.prev = 2;
          return _context4.abrupt("return", res.status(_httpStatusCodes.StatusCodes.CREATED).json(QuickLink));
        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](2);
          next(_context4.t0);
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 6]]);
  }));
  return function createQRPayment(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var bank = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var _req$body2, id, product, total, body, paymentLinkResponse;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, id = _req$body2.id, product = _req$body2.product, total = _req$body2.total;
          if (id) {
            _context5.next = 3;
            break;
          }
          return _context5.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: "ERROR ID"
          }));
        case 3:
          if (product) {
            _context5.next = 5;
            break;
          }
          return _context5.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: "ERROR PRODUCT"
          }));
        case 5:
          if (total) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: "ERROR TOTAL"
          }));
        case 7:
          body = {
            orderCode: id,
            amount: total,
            items: product,
            description: "Thanh toan hoa don ".concat(id),
            returnUrl: "https://tnflow.site/success",
            cancelUrl: "https://tnflow.site/cancel"
          };
          _context5.prev = 8;
          _context5.next = 11;
          return payOS.createPaymentLink(body);
        case 11:
          paymentLinkResponse = _context5.sent;
          return _context5.abrupt("return", res.status(_httpStatusCodes.StatusCodes.CREATED).json({
            url: paymentLinkResponse.checkoutUrl
          }));
        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](8);
          next(_context5.t0);
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[8, 15]]);
  }));
  return function bank(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var checkBank = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var webhookData, updateOrder, dataOrder, productIds;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          webhookData = payOS.verifyPaymentWebhookData(req.body);
          if (!(webhookData.code == '00')) {
            _context6.next = 18;
            break;
          }
          updateOrder = {
            status: true,
            paymentMethod: 'Chuyển Khoản Ngân Hàng'
          };
          _context6.prev = 3;
          _context6.next = 6;
          return _orderModel["default"].findOneAndUpdate({
            orderId: webhookData.orderCode
          }, updateOrder);
        case 6:
          dataOrder = _context6.sent;
          productIds = dataOrder.product.map(function (order) {
            return order.id;
          });
          _context6.next = 10;
          return _userModel["default"].findOneAndUpdate({
            _id: dataOrder.idUser
          }, {
            $addToSet: {
              courses: {
                $each: productIds
              }
            }
          });
        case 10:
          return _context6.abrupt("return", res.status(_httpStatusCodes.StatusCodes.OK).json({
            message: "Khóa học được cập nhập"
          }));
        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](3);
          return _context6.abrupt("return", res.status(_httpStatusCodes.StatusCodes.OK).json({
            message: "Không có khóa học nào được cập nhập"
          }));
        case 16:
          _context6.next = 19;
          break;
        case 18:
          return _context6.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST));
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[3, 13]]);
  }));
  return function checkBank(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var paymentController = {
  payWithMoMo: payWithMoMo,
  payWithZaloPay: payWithZaloPay,
  payWithVNPay: payWithVNPay,
  createQRPayment: createQRPayment,
  bank: bank,
  checkBank: checkBank
};
exports.paymentController = paymentController;