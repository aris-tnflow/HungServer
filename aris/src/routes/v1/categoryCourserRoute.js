"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryCourserRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _categoryCourseController = require("../../controllers/categoryCourseController");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_categoryCourseController.categoryCourserController.allCategory).post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _categoryCourseController.categoryCourserController.addCategory);
Router.route("/:id")["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _categoryCourseController.categoryCourserController.delCategory).put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _categoryCourseController.categoryCourserController.putCategory);
var categoryCourserRouter = Router;
exports.categoryCourserRouter = categoryCourserRouter;