"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluginsRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _filePluginsMiddleware = _interopRequireDefault(require("../../middlewares/filePluginsMiddleware.js"));
var _filePluginsEVMiddleware = _interopRequireDefault(require("../../middlewares/filePluginsEVMiddleware"));
var _pluginsController = require("../../controllers/pluginsController.js");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_pluginsController.pluginsController.all).post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _pluginsController.pluginsController.add);
Router.route("/:id").put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _pluginsController.pluginsController.put)["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _pluginsController.pluginsController.del);
Router.route("/file-plugin").post(_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _filePluginsMiddleware["default"].single('filePlugins'), _pluginsController.pluginsController.addFilePlugins);
Router.route("/file-ev").post(_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _filePluginsEVMiddleware["default"].array('fileEV', 5), _pluginsController.pluginsController.addFileEV);
var pluginsRouter = Router;
exports.pluginsRouter = pluginsRouter;