import express from 'express';
import { emailController, sendEmailController } from '~/controllers/mailController';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, emailController.getEmail)
    .post(rateLimiter.Admin, protectedRoute.isAdmin, emailController.addEmail)

Router.route("/send-email")
    .post(rateLimiter.User, protectedRoute.isUser, sendEmailController.sendMail)

Router.route("/forgot-password")
    .post(sendEmailController.sendMailForgotPass)

Router.route("/:id")
    .get(emailController.sigEmail)
    .put(rateLimiter.Admin, protectedRoute.isAdmin, emailController.putEmail)
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, emailController.delEmail)


export const mailRouter = Router;