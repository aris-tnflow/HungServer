"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var pluginsSchema = new _mongoose["default"].Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: Boolean,
    "default": true
  },
  expiry: {
    type: Date
  },
  src: {
    type: String
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('Plugins', pluginsSchema);
exports["default"] = _default;