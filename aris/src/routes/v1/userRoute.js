"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../../controllers/userController.js");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _userController.userController.allUser);
Router.route("/search").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _userController.userController.searchUser);
Router.route("/check-email").post(_rateLimit.rateLimiter.Bank, _userController.userController.checkEmail);
Router.route("/check-data-old").post(_rateLimit.rateLimiter.Bank, _userController.userController.checkDataOld);
Router.route("/data-user").post(_userController.userController.dataUser);
Router.route("/check-code").post(_userController.userController.checkCodeEmail);
Router.route("/emails").put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _userController.userController.putCoursesByEmail);
Router.route("/video-user").put(_rateLimit.rateLimiter.User, _protected.protectedRoute.isUser, _userController.userController.putVideoUser);
Router.route("/password").put(_rateLimit.rateLimiter.User, _protected.protectedRoute.isUser, _userController.userController.putPassWord);
Router.route("/user/forgot-password").put(_userController.userController.putUserForgot);
Router.route("/user/:id").put(_rateLimit.rateLimiter.User, _protected.protectedRoute.isUser, _userController.userController.putUser);
Router.route("/course/:id").put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _userController.userController.updateCourse);
Router.route("/notify/:id").put(_rateLimit.rateLimiter.User, _protected.protectedRoute.isUser, _userController.userController.putUsernotify);
Router.route("/video/:id").put(_rateLimit.rateLimiter.User, _protected.protectedRoute.isUser, _userController.userController.putUserVideo);
Router.route("/:id").get(_userController.userController.singleUser)["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _userController.userController.deleteUser).put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _userController.userController.updateUser);
var userRouter = Router;
exports.userRouter = userRouter;