"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var notificationSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    "default": true
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('notification', notificationSchema);
exports["default"] = _default;