"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _mailController = require("../../controllers/mailController");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _mailController.emailController.getEmail).post(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _mailController.emailController.addEmail);
Router.route("/send-email").post(_rateLimit.rateLimiter.User, _protected.protectedRoute.isUser, _mailController.sendEmailController.sendMail);
Router.route("/forgot-password").post(_mailController.sendEmailController.sendMailForgotPass);
Router.route("/:id").get(_mailController.emailController.sigEmail).put(_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _mailController.emailController.putEmail)["delete"](_rateLimit.rateLimiter.Admin, _protected.protectedRoute.isAdmin, _mailController.emailController.delEmail);
var mailRouter = Router;
exports.mailRouter = mailRouter;