"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var pluginsScriptSchema = new _mongoose["default"].Schema({
  scripts: [{
    type: String
  }],
  styles: [{
    type: String
  }]
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('pluginsScript', pluginsScriptSchema);
exports["default"] = _default;