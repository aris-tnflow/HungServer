"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courserRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _courseController = require("../../controllers/courseController");
var _fileMiddleware = _interopRequireDefault(require("../../middlewares/fileMiddleware.js"));
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_courseController.courserController.getCourser).post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courserController.addCourser);
Router.route("/user").post(_courseController.courserController.checkCourseUser);
Router.route("/outstand").post(_courseController.courserController.outstandCourse);
Router.route("/free").get(_courseController.courserController.freeCourse);
Router.route("/search").get(_courseController.searchCourserController.searchCourses);
Router.route("/cart/").post(_courseController.courserController.allCourserCart);
Router.route("/image").post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _fileMiddleware["default"].single('file'), _courseController.courserController.addImageCourses);
Router.route("/order").put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courserController.putOrder);
Router.route("/sig-admin/:slug").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courserController.sigAdmin);
Router.route("/slug/:slug").get(_courseController.courserController.sigCourser).put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courserController.updateCourseModule);
Router.route("/admin/children/:id").post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courseAdminController.addModuleChildren).put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courseAdminController.putModuleChildren)["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courseAdminController.delModuleChildren);
Router.route("/admin/children/:id/childId/:childId").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courseAdminController.getModuleChildren).put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courseAdminController.putModuleChildren)["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courseAdminController.delModuleChildren);
Router.route("/user/module/:id").get(_rateLimit.rateLimiter.User, _protected.protectedRoute.isUser, _courseController.courseAdminController.getModuleUser);
Router.route("/admin/module/:id").get(_rateLimit.rateLimiter.User, _protected.protectedRoute.isUser, _courseController.courseAdminController.getModule).post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courseAdminController.addModule);
Router.route("/admin/module/:id/moduleId/:moduleId").put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courseAdminController.putModule)["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courseAdminController.delModule);
Router.route("/:id").get(_courseController.courserController.sigCourser)["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courserController.delCourser).put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _courseController.courserController.putCourser);
var courserRouter = Router;
exports.courserRouter = courserRouter;