import express from 'express';
import { pluginsScriptController } from '~/controllers/pluginsScriptController.js';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(pluginsScriptController.allPluginsScript)
    .post(pluginsScriptController.addPluginsScript)
    .delete(pluginsScriptController.delPluginsScript)

export const pluginsScriptRouter = Router;