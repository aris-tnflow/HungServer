import express from 'express';
import { pagesController } from '~/controllers/pagesController.js';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/:page-edit/:slug")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, pagesController.sigPageEdit)

Router.route("/slug/:slug")
    .get(pagesController.sigPage)

Router.route("/search")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, pagesController.searchPage)

Router.route("/")
    .get(rateLimiter.Admin, protectedRoute.isAdmin, pagesController.allPage)
    .post(rateLimiter.Admin, protectedRoute.isAdmin, pagesController.addPage)

Router.route("/group-page/:group")
    .get(pagesController.allGroupPage)

Router.route("/order")
    .put(rateLimiter.Admin, protectedRoute.isAdmin, pagesController.putOrder)

Router.route("/change-text")
    .post(rateLimiter.Admin, protectedRoute.isAdmin, pagesController.changeText)

Router.route("/:id")
    .post(rateLimiter.Admin, protectedRoute.isAdmin, pagesController.copyPage)
    .put(rateLimiter.Admin, protectedRoute.isAdmin, pagesController.putPage)
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, pagesController.delPage)

export const pagesRouter = Router;
