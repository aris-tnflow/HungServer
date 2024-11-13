"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inCludeRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _includeController = require("../../controllers/includeController");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_includeController.includeController.all).post(_includeController.includeController.add);
Router.route("/:id")["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _includeController.includeController.del).put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _includeController.includeController.put);
var inCludeRouter = Router;
exports.inCludeRouter = inCludeRouter;