import express from 'express';
import { dataSetting } from '~/controllers/settingController.js';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, dataSetting.get)
    .post(rateLimiter.Admin, protectedRoute.isAdmin, dataSetting.put)

Router.route("/:key")
    .get(dataSetting.getKey)

export const settingRouter = Router;