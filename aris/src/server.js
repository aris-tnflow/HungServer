"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireDefault(require("path"));
var _compression = _interopRequireDefault(require("compression"));
var _helmet = _interopRequireDefault(require("helmet"));
var _errorMiddleware = require("./middlewares/errorMiddleware.js");
var _rateLimit = require("./config/rateLimit.js");
var _cors2 = require("./config/cors.js");
var _database = _interopRequireDefault(require("./config/database.js"));
var _index = _interopRequireDefault(require("./routes/v1/index.js"));
var app = (0, _express["default"])();

// Config
_dotenv["default"].config(); //env

//database
(0, _database["default"])();

// BodyParser
app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
app.use(_bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
}));

// CorsOptions
app.use((0, _cors["default"])()); // 

// Protect 
app.use(_rateLimit.rateLimiter.All);
app.set('trust proxy', 1);
app.use(_helmet["default"].crossOriginResourcePolicy({
  policy: "cross-origin"
}));
app.use((0, _morgan["default"])('dev'));

// Static
app.use(_express["default"].json());
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));

// Compression
app.use((0, _compression["default"])());

// Routes
app.use('/v2', _index["default"]); // API V1

// Error
app.use(_errorMiddleware.errorHandlingMiddleware);
app.use(function (req, res) {
  res.status(404).json({
    message: 'Route not found'
  });
});
var PORT = 8082;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});