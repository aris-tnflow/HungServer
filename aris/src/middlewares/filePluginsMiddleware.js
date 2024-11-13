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
    cb(null, _path["default"].join(__dirname, '../public/uploads/plugins/'));
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + _path["default"].extname(file.originalname));
  }
});
var fileFilter = function fileFilter(req, file, cb) {
  var allowedExtensions = ['.js'];
  var ext = _path["default"].extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ cho phép upload file JS'), false);
  }
};
var uploadPlugins = (0, _multer["default"])({
  storage: storage,
  fileFilter: fileFilter
});
var _default = uploadPlugins;
exports["default"] = _default;