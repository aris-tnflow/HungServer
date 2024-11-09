import express from 'express';
import { maronryController } from '~/controllers/customPageController';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/masonry")
    .post(rateLimiter.Admin, protectedRoute.isAdmin, maronryController.addMasonry)

Router.route("/masonry/:slug")
    .get(maronryController.sigMasonry)
    .put(rateLimiter.Admin, protectedRoute.isAdmin, maronryController.putMasonry)
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, maronryController.delMasonry);

export const customPageRouter = Router;