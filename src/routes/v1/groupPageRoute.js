import express from 'express';
import { groupPageController } from '~/controllers/groupPageController.js';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(groupPageController.allGroup)
    .post(rateLimiter.Admin, protectedRoute.isAdmin, groupPageController.addGroup);

Router.route("/check/:slug")
    .get(groupPageController.checkGroup);

Router.route("/:id")
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, groupPageController.delGroup)
    .put(rateLimiter.Admin, protectedRoute.isAdmin, groupPageController.putGroup);

export const groupPageRouter = Router;