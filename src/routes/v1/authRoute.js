import express from 'express';
import { authController } from '~/controllers/authController.js';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/login").post(authController.login)
Router.route("/login-google").post(authController.loginGoogle)
Router.route("/register").post(rateLimiter.Auth, authController.register)
Router.route("/reauth").post(authController.reAuth)

export const authRouter = Router;