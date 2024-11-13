"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileManagerRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _fileManagerControllder = require("../../controllers/fileManagerControllder");
var _protected = require("../../utils/protected");
var _rateLimit = require("../../config/rateLimit.js");
var Router = _express["default"].Router();
Router.route("/").get(_fileManagerControllder.fileManagerController.allFile);
Router.route("/images").get(_fileManagerControllder.fileManagerController.getAllImages);
Router.route("/file")["delete"](_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _fileManagerControllder.fileManagerController.delFile);
Router.route("/folder").get(_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _fileManagerControllder.folderManagerController.getFolder).post(_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _fileManagerControllder.folderManagerController.addFolder).put(_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _fileManagerControllder.folderManagerController.putFolder)["delete"](_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _fileManagerControllder.folderManagerController.delFolder);
Router.route("/dow-folder").post(_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _fileManagerControllder.folderManagerController.dowFolder);
Router.route("/filter").post(_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _fileManagerControllder.fileManagerController.filterFileType);
Router.route("/files-in-folder").post(_rateLimit.rateLimiter.File, _protected.protectedRoute.isAdmin, _fileManagerControllder.fileManagerController.filesInFolder);
var fileManagerRouter = Router;
exports.fileManagerRouter = fileManagerRouter;