import express from 'express';
import { testController } from '~/controllers/testController.js';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .post(rateLimiter.Admin, protectedRoute.isAdmin, testController.post)

export const testRouter = Router;
