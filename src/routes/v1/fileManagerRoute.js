import express from 'express';
import { fileManagerController, folderManagerController } from '~/controllers/fileManagerControllder';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .get(fileManagerController.allFile)

Router.route("/images")
    .get(fileManagerController.getAllImages);

Router.route("/file")
    .delete(rateLimiter.File, protectedRoute.isAdmin, fileManagerController.delFile);

Router.route("/folder")
    .get(rateLimiter.File, protectedRoute.isAdmin, folderManagerController.getFolder)
    .post(rateLimiter.File, protectedRoute.isAdmin, folderManagerController.addFolder)
    .put(rateLimiter.File, protectedRoute.isAdmin, folderManagerController.putFolder)
    .delete(rateLimiter.File, protectedRoute.isAdmin, folderManagerController.delFolder);

Router.route("/dow-folder")
    .post(rateLimiter.File, protectedRoute.isAdmin, folderManagerController.dowFolder);

Router.route("/filter")
    .post(rateLimiter.File, protectedRoute.isAdmin, fileManagerController.filterFileType);

Router.route("/files-in-folder")
    .post(rateLimiter.File, protectedRoute.isAdmin, fileManagerController.filesInFolder);

export const fileManagerRouter = Router;