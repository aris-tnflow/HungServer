import express from 'express';
import { infoController } from '~/controllers/infoController';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(infoController.get)
    .post(rateLimiter.Admin, protectedRoute.isAdmin, infoController.add)

Router.route("/:id")
    .put(rateLimiter.Admin, protectedRoute.isAdmin, infoController.put)

export const infoRouter = Router;