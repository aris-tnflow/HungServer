import express from 'express';
import { userController } from '../../controllers/userController.js';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, userController.allUser)

Router.route("/search")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, userController.searchUser)

Router.route("/check-email")
    .post(rateLimiter.Bank, userController.checkEmail)

Router.route("/check-data-old")
    .post(rateLimiter.Bank, userController.checkDataOld)

Router.route("/data-user")
    .post(userController.dataUser)

Router.route("/check-code")
    .post(userController.checkCodeEmail)

Router.route("/emails")
    .put(rateLimiter.Admin, protectedRoute.isAdmin, userController.putCoursesByEmail)

Router.route("/video-user")
    .put(rateLimiter.User, protectedRoute.isUser, userController.putVideoUser)

Router.route("/password")
    .put(rateLimiter.User, protectedRoute.isUser, userController.putPassWord)

Router.route("/user/forgot-password")
    .put(userController.putUserForgot)

Router.route("/user/:id")
    .put(rateLimiter.User, protectedRoute.isUser, userController.putUser)

Router.route("/course/:id")
    .put(rateLimiter.Admin, protectedRoute.isAdmin, userController.updateCourse)

Router.route("/notify/:id")
    .put(rateLimiter.User, protectedRoute.isUser, userController.putUsernotify)

Router.route("/video/:id")
    .put(rateLimiter.User, protectedRoute.isUser, userController.putUserVideo)

Router.route("/:id")
    .get(userController.singleUser)
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, userController.deleteUser)
    .put(rateLimiter.Admin, protectedRoute.isAdmin, userController.updateUser)

export const userRouter = Router;
