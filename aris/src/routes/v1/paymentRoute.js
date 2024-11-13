"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _paymentController = require("../../controllers/paymentController");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/momo").post(_rateLimit.rateLimiter.Bank, _protected.protectedRoute.isUser, _paymentController.paymentController.payWithMoMo);
Router.route("/zalopay").post(_rateLimit.rateLimiter.Bank, _protected.protectedRoute.isUser, _paymentController.paymentController.payWithZaloPay);
Router.route("/vnpay").post(_rateLimit.rateLimiter.Bank, _protected.protectedRoute.isUser, _paymentController.paymentController.payWithVNPay);
Router.route("/create-qr-payment").post(_rateLimit.rateLimiter.Bank, _protected.protectedRoute.isUser, _paymentController.paymentController.createQRPayment);
Router.route("/bank").post(_rateLimit.rateLimiter.Bank, _protected.protectedRoute.isUser, _paymentController.paymentController.bank);
Router.route("/check-bank").post(_paymentController.paymentController.checkBank);
var paymentRouter = Router;
exports.paymentRouter = paymentRouter;