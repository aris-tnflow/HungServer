import express from 'express';
import { categoryCourserController } from '~/controllers/categoryCourseController';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(categoryCourserController.allCategory)
    .post(rateLimiter.Admin, protectedRoute.isAdmin, categoryCourserController.addCategory)

Router.route("/:id")
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, categoryCourserController.delCategory)
    .put(rateLimiter.Admin, protectedRoute.isAdmin, categoryCourserController.putCategory)

export const categoryCourserRouter = Router;