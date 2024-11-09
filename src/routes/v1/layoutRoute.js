import express from 'express';
import { layoutController } from '~/controllers/layoutController.js';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(layoutController.getLayout)
    .post(rateLimiter.Admin, protectedRoute.isAdmin, layoutController.addLayout)

Router.route("/:id")
    .put(rateLimiter.Admin, protectedRoute.isAdmin, layoutController.updateLayout)

Router.route("/edit")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, layoutController.getEdit)

export const layoutRouter = Router;