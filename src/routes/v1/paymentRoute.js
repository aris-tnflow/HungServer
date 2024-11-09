import express from 'express';
import { paymentController } from '~/controllers/paymentController';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/momo")
    .post(rateLimiter.Bank, protectedRoute.isUser, paymentController.payWithMoMo)

Router.route("/zalopay")
    .post(rateLimiter.Bank, protectedRoute.isUser, paymentController.payWithZaloPay)

Router.route("/vnpay")
    .post(rateLimiter.Bank, protectedRoute.isUser, paymentController.payWithVNPay)

Router.route("/create-qr-payment")
    .post(rateLimiter.Bank, protectedRoute.isUser, paymentController.createQRPayment)

Router.route("/bank")
    .post(rateLimiter.Bank, protectedRoute.isUser, paymentController.bank)

Router.route("/check-bank")
    .post(paymentController.checkBank)

export const paymentRouter = Router;