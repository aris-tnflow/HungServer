import express from 'express';
import { roleController } from '~/controllers/roleController.js';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, roleController.allRole)
    .post(rateLimiter.Admin, protectedRoute.isAdmin, roleController.addRole)

Router.route("/:id")
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, roleController.delRole)
    .put(rateLimiter.Admin, protectedRoute.isAdmin, roleController.putRole)

export const roleRouter = Router;