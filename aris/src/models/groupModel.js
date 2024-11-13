"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var groupPageSchema = new _mongoose["default"].Schema({
  group: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('group', groupPageSchema);
exports["default"] = _default;