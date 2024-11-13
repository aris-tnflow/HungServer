"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyBankRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _bankController = require("../../controllers/bankController");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_rateLimit.rateLimiter.User, _bankController.bankController.get).post(_rateLimit.rateLimiter.Bank, _protected.protectedRoute.isAdminMax, _bankController.bankController.add);
Router.route("/admin").get(_rateLimit.rateLimiter.Bank, _protected.protectedRoute.isAdminMax, _bankController.bankController.getAmin);
Router.route("/:id").put(_rateLimit.rateLimiter.Bank, _protected.protectedRoute.isAdminMax, _bankController.bankController.put);
var keyBankRouter = Router;
exports.keyBankRouter = keyBankRouter;