"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _path["default"].join(__dirname, '../public/uploads/video/'));
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + _path["default"].extname(file.originalname));
  }
});
var videoFileFilter = function videoFileFilter(req, file, cb) {
  if (file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ được phép tải lên video!'), false);
  }
};
var uploadVideo = (0, _multer["default"])({
  storage: storage,
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 4 * 1024 * 1024 * 1024
  }
});
var _default = uploadVideo;
exports["default"] = _default;