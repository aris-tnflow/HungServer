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
  account: {
    type: String,
    required: true
  },
  nameAccount: {
    type: String,
    required: true
  }
  // momoKey1: {
  //     type: String,
  // },
  // momoKey2: {
  //     type: String,
  // },
  // zaloKey1: {
  //     type: String,
  // },
  // vnKey1: {
  //     type: String,
  // },
  // vnKey2: {
  //     type: String,
  // },
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('KeyBank', infoSchema);
exports["default"] = _default;