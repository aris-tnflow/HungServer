import express from 'express';
import { rateLimiter } from '~/config/rateLimit';
import { dataController } from '~/controllers/dataController';
import { protectedRoute } from '~/utils/protected';

const Router = express.Router();

Router.route("/")
    .post(rateLimiter.Admin, protectedRoute.isAdmin, dataController.restore);

Router.route("/backup")
    .post(rateLimiter.Private, protectedRoute.isAdmin, dataController.backup);

Router.route("/media")
    .get(dataController.dataMedia)

Router.route("/usage")
    .get(dataController.getDataUsage)


export const dataRouter = Router;