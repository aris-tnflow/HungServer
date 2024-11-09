import express from 'express';
import { notificationController } from '~/controllers/notificationController';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(notificationController.all)
    .post(rateLimiter.Admin, protectedRoute.isAdmin, notificationController.add)

Router.route("/:id")
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, notificationController.del)
    .put(rateLimiter.Admin, protectedRoute.isAdmin, notificationController.put)

export const notificationRouter = Router;