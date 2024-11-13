"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notificationRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _notificationController = require("../../controllers/notificationController");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_notificationController.notificationController.all).post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _notificationController.notificationController.add);
Router.route("/:id")["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _notificationController.notificationController.del).put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _notificationController.notificationController.put);
var notificationRouter = Router;
exports.notificationRouter = notificationRouter;