import express from 'express';

import upload from '~/middlewares/fileMiddleware.js';
import uploads from '~/middlewares/files';
import upload3D from '~/middlewares/file3dMiddleware';
import uploadVideo from '~/middlewares/fileVideoMiddleware';

import { uploadController } from '~/controllers/fileController.js';
import { protectedRoute } from '~/utils/protected';
import { rateLimiter } from '~/config/rateLimit.js';

const Router = express.Router();

Router.route("/")
    .post(rateLimiter.File, protectedRoute.isAdmin, upload.single('file'), uploadController.file)

Router.route("/multi")
    .post(rateLimiter.File, protectedRoute.isAdmin, uploads.array('files'), uploadController.files)

Router.route("/3d")
    .post(rateLimiter.File, protectedRoute.isAdmin, upload3D.single('file3d'), uploadController.file3d)

Router.route("/video")
    .post(rateLimiter.File, protectedRoute.isAdmin, uploadVideo.single('fileVideo'), uploadController.fileVideo)

Router.route("/base64")
    .post(rateLimiter.File, protectedRoute.isAdmin, uploadController.fileBase64)

Router.route("/compress")
    .post(rateLimiter.File, protectedRoute.isAdmin, uploadController.fileCompressFolder)

export const fileRouter = Router;