import express from 'express';
import { scriptController } from '~/controllers/scriptController';

const Router = express.Router();

Router.route("/")
    .get(scriptController.get)

export const scriptRouter = Router;