"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _testController = require("../../controllers/testController.js");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _testController.testController.post);
var testRouter = Router;
exports.testRouter = testRouter;