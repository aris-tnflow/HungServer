"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.layoutRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _layoutController = require("../../controllers/layoutController.js");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_layoutController.layoutController.getLayout).post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _layoutController.layoutController.addLayout);
Router.route("/:id").put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _layoutController.layoutController.updateLayout);
Router.route("/edit").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _layoutController.layoutController.getEdit);
var layoutRouter = Router;
exports.layoutRouter = layoutRouter;