"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var groupPageSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  svgCode: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('Include', groupPageSchema);
exports["default"] = _default;