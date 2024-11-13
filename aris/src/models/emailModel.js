"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var emailSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  funtion: {
    type: String
  },
  content: {
    html: {
      type: String
    },
    css: {
      type: String
    },
    js: {
      type: String
    }
  },
  edit: {
    type: Object
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('emails', emailSchema);
exports["default"] = _default;