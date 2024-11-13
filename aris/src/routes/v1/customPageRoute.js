"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customPageRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _customPageController = require("../../controllers/customPageController");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/masonry").post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _customPageController.maronryController.addMasonry);
Router.route("/masonry/:slug").get(_customPageController.maronryController.sigMasonry).put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _customPageController.maronryController.putMasonry)["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _customPageController.maronryController.delMasonry);
var customPageRouter = Router;
exports.customPageRouter = customPageRouter;