import express from 'express';
import { contactController } from '~/controllers/contactController';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .post(contactController.add)
    .put(contactController.put)
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, contactController.del);

Router.route("/:filename")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, contactController.get)
export const contactRouter = Router;