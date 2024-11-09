import express from 'express';
import { includeController } from '~/controllers/includeController';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(includeController.all)
    .post(includeController.add);

Router.route("/:id")
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, includeController.del)
    .put(rateLimiter.Admin, protectedRoute.isAdmin, includeController.put);

export const inCludeRouter = Router;