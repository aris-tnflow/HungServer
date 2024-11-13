"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluginsScriptRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _pluginsScriptController = require("../../controllers/pluginsScriptController.js");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_pluginsScriptController.pluginsScriptController.allPluginsScript).post(_pluginsScriptController.pluginsScriptController.addPluginsScript)["delete"](_pluginsScriptController.pluginsScriptController.delPluginsScript);
var pluginsScriptRouter = Router;
exports.pluginsScriptRouter = pluginsScriptRouter;