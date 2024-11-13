"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roleRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _roleController = require("../../controllers/roleController.js");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _roleController.roleController.allRole).post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _roleController.roleController.addRole);
Router.route("/:id")["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _roleController.roleController.delRole).put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _roleController.roleController.putRole);
var roleRouter = Router;
exports.roleRouter = roleRouter;