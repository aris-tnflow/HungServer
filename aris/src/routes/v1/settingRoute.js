"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settingRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _settingController = require("../../controllers/settingController.js");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _settingController.dataSetting.get).post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _settingController.dataSetting.put);
Router.route("/:key").get(_settingController.dataSetting.getKey);
var settingRouter = Router;
exports.settingRouter = settingRouter;