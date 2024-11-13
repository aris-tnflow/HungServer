"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _contactController = require("../../controllers/contactController");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").post(_contactController.contactController.add).put(_contactController.contactController.put)["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _contactController.contactController.del);
Router.route("/:filename").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _contactController.contactController.get);
var contactRouter = Router;
exports.contactRouter = contactRouter;