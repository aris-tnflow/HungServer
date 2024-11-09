import express from 'express';
import { provincesController } from '~/controllers/provincesController.js';
const Router = express.Router();

Router.route("/")
    .get(provincesController.getProvinces)

Router.route("/district/:id")
    .get(provincesController.getDistricts)

Router.route("/ward/:id")
    .get(provincesController.getWards)

export const provincesRouter = Router;