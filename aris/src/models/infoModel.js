"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var infoSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  manage: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  keywords: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  imgIcon: {
    type: String
  },
  imgLogin: {
    type: String
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('Info', infoSchema);
exports["default"] = _default;