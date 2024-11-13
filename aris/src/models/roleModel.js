"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var roleSchema = new _mongoose["default"].Schema({
  nameRole: {
    type: String,
    required: true
  },
  role: [{
    type: String
  }]
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('Role', roleSchema);
exports["default"] = _default;