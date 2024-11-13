"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WHITELIST_DOMAINS = exports.TYPE_EMPLOYEE = exports.BaseServer = exports.BaseClient = void 0;
var _dotenv = require("./dotenv");
var WHITELIST_DOMAINS = [_dotenv.env.URL_API, _dotenv.env.URL_CLIENT, 'http://localhost:5173'];
exports.WHITELIST_DOMAINS = WHITELIST_DOMAINS;
var TYPE_EMPLOYEE = {
  admin: "admin",
  user: "user",
  adminControl: "admin-control"
};
exports.TYPE_EMPLOYEE = TYPE_EMPLOYEE;
var apiRoot = process.env.BUILD_MODE === 'dev' ? "http://localhost:8082" : process.env.BUILD_MODE === 'production' ? _dotenv.env.URL_API : '';
var BaseServer = apiRoot;
exports.BaseServer = BaseServer;
var apiClient = process.env.BUILD_MODE === 'dev' ? "http://localhost:5173" : process.env.BUILD_MODE === 'production' ? _dotenv.env.URL_CLIENT : '';
var BaseClient = apiClient;
exports.BaseClient = BaseClient;