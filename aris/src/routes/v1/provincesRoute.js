"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.provincesRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _provincesController = require("../../controllers/provincesController.js");
var Router = _express["default"].Router();
Router.route("/").get(_provincesController.provincesController.getProvinces);
Router.route("/district/:id").get(_provincesController.provincesController.getDistricts);
Router.route("/ward/:id").get(_provincesController.provincesController.getWards);
var provincesRouter = Router;
exports.provincesRouter = provincesRouter;