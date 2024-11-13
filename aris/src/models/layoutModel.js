"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var layoutSchema = new _mongoose["default"].Schema({
  header: {
    type: String,
    required: true
  },
  footer: {
    type: String,
    required: true
  },
  css: {
    type: String,
    required: true
  },
  edit: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('layout', layoutSchema);
exports["default"] = _default;