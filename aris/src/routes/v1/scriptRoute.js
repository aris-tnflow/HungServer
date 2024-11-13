"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scriptRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _scriptController = require("../../controllers/scriptController");
var Router = _express["default"].Router();
Router.route("/").get(_scriptController.scriptController.get);
var scriptRouter = Router;
exports.scriptRouter = scriptRouter;