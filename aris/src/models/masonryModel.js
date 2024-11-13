"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var imgSchema = new _mongoose["default"].Schema({
  imgSrc: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  aspectRatio: {
    type: String,
    required: true
  },
  link: {
    type: String,
    "default": ''
  }
});
var masonrySchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  img: [imgSchema]
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('masonry', masonrySchema);
exports["default"] = _default;