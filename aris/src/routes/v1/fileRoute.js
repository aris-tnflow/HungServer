"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _fileMiddleware = _interopRequireDefault(require("../../middlewares/fileMiddleware.js"));
var _files = _interopRequireDefault(require("../../middlewares/files"));
var _file3dMiddleware = _interopRequireDefault(require("../../middlewares/file3dMiddleware"));
var _fileVideoMiddleware = _interopRequireDefault(require("../../middlewares/fileVideoMiddleware"));
var _fileController = require("../../controllers/fileController.js");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").post(_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _fileMiddleware["default"].single('file'), _fileController.uploadController.file);
Router.route("/multi").post(_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _files["default"].array('files'), _fileController.uploadController.files);
Router.route("/3d").post(_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _file3dMiddleware["default"].single('file3d'), _fileController.uploadController.file3d);
Router.route("/video").post(_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _fileVideoMiddleware["default"].single('fileVideo'), _fileController.uploadController.fileVideo);
Router.route("/base64").post(_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _fileController.uploadController.fileBase64);
Router.route("/compress").post(_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _fileController.uploadController.fileCompressFolder);
var fileRouter = Router;
exports.fileRouter = fileRouter;