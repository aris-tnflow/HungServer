import express from 'express';
import { bankController } from '~/controllers/bankController';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(rateLimiter.User, bankController.get)
    .post(rateLimiter.Bank, protectedRoute.isAdminMax, bankController.add)

Router.route("/admin")
    .get(rateLimiter.Bank, protectedRoute.isAdminMax, bankController.getAmin)

Router.route("/:id")
    .put(rateLimiter.Bank, protectedRoute.isAdminMax, bankController.put)

export const keyBankRouter = Router;