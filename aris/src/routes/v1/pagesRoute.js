"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pagesRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _pagesController = require("../../controllers/pagesController.js");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/:page-edit/:slug").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _pagesController.pagesController.sigPageEdit);
Router.route("/slug/:slug").get(_pagesController.pagesController.sigPage);
Router.route("/search").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _pagesController.pagesController.searchPage);
Router.route("/").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _pagesController.pagesController.allPage).post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _pagesController.pagesController.addPage);
Router.route("/group-page/:group").get(_pagesController.pagesController.allGroupPage);
Router.route("/order").put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _pagesController.pagesController.putOrder);
Router.route("/change-text").post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _pagesController.pagesController.changeText);
Router.route("/:id").post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _pagesController.pagesController.copyPage).put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _pagesController.pagesController.putPage)["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _pagesController.pagesController.delPage);
var pagesRouter = Router;
exports.pagesRouter = pagesRouter;