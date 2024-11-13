"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _orderController = require("../../controllers/orderController");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/stats").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _orderController.orderController.stats);
Router.route("/weekly").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _orderController.orderController.totalWeeklyRevenue);
Router.route("/total").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _orderController.orderController.totalRevenue);
Router.route("/data-order").post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _orderController.orderController.dataOrder);
Router.route("/check-order").post(_orderController.orderController.checkOrder);
Router.route("/search").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _orderController.orderController.searchOrder);
Router.route("/del-unpaid")["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _orderController.orderController.delUnpaidOrders);
Router.route("/order-id/:orderId").get(_rateLimit.rateLimiter.User, _protected.protectedRoute.isUser, _orderController.orderController.getOrderByOrderId).put(_rateLimit.rateLimiter.User, _protected.protectedRoute.isUser, _orderController.orderController.putOrderByOrderId);
Router.route("/").get(_rateLimit.rateLimiter.User, _protected.protectedRoute.isUser, _orderController.orderController.allOrder).post(_rateLimit.rateLimiter.User, _protected.protectedRoute.isUser, _orderController.orderController.addOrder);
Router.route("/:id").get(_rateLimit.rateLimiter.User, _protected.protectedRoute.isUser, _orderController.orderController.sigOrder)["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _orderController.orderController.delOrder).put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _orderController.orderController.putOrder);
var orderRouter = Router;
exports.orderRouter = orderRouter;