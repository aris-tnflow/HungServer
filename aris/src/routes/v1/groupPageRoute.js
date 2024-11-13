"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupPageRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _groupPageController = require("../../controllers/groupPageController.js");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_groupPageController.groupPageController.allGroup).post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _groupPageController.groupPageController.addGroup);
Router.route("/check/:slug").get(_groupPageController.groupPageController.checkGroup);
Router.route("/:id")["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _groupPageController.groupPageController.delGroup).put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _groupPageController.groupPageController.putGroup);
var groupPageRouter = Router;
exports.groupPageRouter = groupPageRouter;