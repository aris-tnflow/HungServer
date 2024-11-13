"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var allowedImageTypes = ['image/jpeg',
// JPEG
'image/png',
// PNG
'image/gif',
// GIF
'image/webp',
// WebP
'image/svg+xml',
// SVG
'image/bmp',
// BMP
'image/tiff' // TIFF
];

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _path["default"].join(__dirname, '../public/uploads/img'));
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + _path["default"].extname(file.originalname));
  }
});
var fileFilter = function fileFilter(req, file, cb) {
  if (allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ cho phép tải lên hình ảnh'), false); // Từ chối file tải lên
  }
};

var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: fileFilter
});
var _default = upload;
exports["default"] = _default;