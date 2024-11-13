"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _rateLimit = require("../../config/rateLimit");
var _dataController = require("../../controllers/dataController");
var _protected = require("../../utils/protected");
var Router = _express["default"].Router();
Router.route("/").post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _dataController.dataController.restore);
Router.route("/backup").post(_rateLimit.rateLimiter.Private, _protected.protectedRoute.isAdmin, _dataController.dataController.backup);
Router.route("/media").get(_dataController.dataController.dataMedia);
Router.route("/usage").get(_dataController.dataController.getDataUsage);
var dataRouter = Router;
exports.dataRouter = dataRouter;