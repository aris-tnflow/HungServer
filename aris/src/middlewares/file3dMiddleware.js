"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var fileFilter = function fileFilter(req, file, cb) {
  var allowedTypes = ['glb'];
  var extname = _path["default"].extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(extname.slice(1))) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận tệp .glb'), false); // Từ chối tệp
  }
};

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _path["default"].join(__dirname, '../public/uploads/3d/'));
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + _path["default"].extname(file.originalname));
  }
});
var upload3D = (0, _multer["default"])({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 4 * 1024 * 1024 * 1024
  }
});
var _default = upload3D;
exports["default"] = _default;