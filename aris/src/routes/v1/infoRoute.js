"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _infoController = require("../../controllers/infoController");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_infoController.infoController.get).post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _infoController.infoController.add);
Router.route("/:id").put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _infoController.infoController.put);
var infoRouter = Router;
exports.infoRouter = infoRouter;