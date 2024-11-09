import express from 'express';
import uploadPlugins from "~/middlewares/filePluginsMiddleware.js";
import uploadPluginsEV from '~/middlewares/filePluginsEVMiddleware';

import { pluginsController } from "~/controllers/pluginsController.js";
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(pluginsController.all)
    .post(rateLimiter.Admin, protectedRoute.isAdmin, pluginsController.add)

Router.route("/:id")
    .put(rateLimiter.Admin, protectedRoute.isAdmin, pluginsController.put)
    .delete(rateLimiter.Admin, protectedRoute.isAdmin, pluginsController.del)

Router.route("/file-plugin")
    .post(rateLimiter.File, protectedRoute.isAdmin, uploadPlugins.single('filePlugins'), pluginsController.addFilePlugins)

Router.route("/file-ev")
    .post(rateLimiter.File, protectedRoute.isAdmin, uploadPluginsEV.array('fileEV', 5), pluginsController.addFileEV)

export const pluginsRouter = Router;