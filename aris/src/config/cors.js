"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOptions = void 0;
var _constants = require("../utils/constants.js");
var _httpStatusCodes = require("http-status-codes");
var _apiError = _interopRequireDefault(require("../utils/apiError.js"));
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (!_origin && process.env.BUILD_MODE === 'dev') {
      return callback(null, true);
    }
    if (_constants.WHITELIST_DOMAINS.includes(_origin)) {
      return callback(null, true);
    }
    return callback(new _apiError["default"](_httpStatusCodes.StatusCodes.FORBIDDEN, "ARIS-3D not allowed by our CORS Policy."));
  },
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  optionsSuccessStatus: 200,
  credentials: true
};
exports.corsOptions = corsOptions;