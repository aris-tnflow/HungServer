"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var categoryCourseSchema = new _mongoose["default"].Schema({
  category: {
    type: String,
    required: true
  },
  slug: {
    type: String
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('CategoryCourse', categoryCourseSchema);
exports["default"] = _default;