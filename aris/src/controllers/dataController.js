"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _child_process = require("child_process");
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _mongodb = require("mongodb");
var _dotenv = require("../utils/dotenv");
var _nodeCron = _interopRequireDefault(require("node-cron"));
var _setting = _interopRequireDefault(require("../json/setting.json"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var backup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var listCollections, _listCollections, backupCollection, DB_NAME, now, timestamp, BACKUP_DIR, collections, _iterator, _step, collection, ARCHIVE_PATH;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          backupCollection = function _backupCollection(dbName, collection, archivePath) {
            return new Promise(function (resolve, reject) {
              var child = (0, _child_process.spawn)('mongodump', ["--db=".concat(dbName), "--collection=".concat(collection), "--uri=".concat(_dotenv.env.MONGODB_URI), "--archive=".concat(archivePath), '--gzip']);
              child.stdout.on('data', function (data) {
                console.log('stdout:\n', data.toString());
              });
              child.stderr.on('data', function (data) {
                console.log('stderr:\n', data.toString());
              });
              child.on('error', function (error) {
                console.error('Error during backup process:', error);
                reject(error);
              });
              child.on('exit', function (code, signal) {
                if (code) {
                  console.error('Process exit with code:', code);
                  reject(new Error("Backup process exited with code: ".concat(code)));
                } else if (signal) {
                  console.error('Process killed with signal:', signal);
                  reject(new Error("Backup process killed with signal: ".concat(signal)));
                } else {
                  console.log("Backup is successful for collection ".concat(collection, " \u2705"));
                  resolve();
                }
              });
            });
          };
          _listCollections = function _listCollections3() {
            _listCollections = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(dbName) {
              var client, db, _collections;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    client = new _mongodb.MongoClient(_dotenv.env.MONGODB_URI);
                    _context.prev = 1;
                    _context.next = 4;
                    return client.connect();
                  case 4:
                    db = client.db(dbName);
                    _context.next = 7;
                    return db.listCollections().toArray();
                  case 7:
                    _collections = _context.sent;
                    return _context.abrupt("return", _collections.map(function (col) {
                      return col.name;
                    }));
                  case 9:
                    _context.prev = 9;
                    _context.next = 12;
                    return client.close();
                  case 12:
                    return _context.finish(9);
                  case 13:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[1,, 9, 13]]);
            }));
            return _listCollections.apply(this, arguments);
          };
          listCollections = function _listCollections2(_x4) {
            return _listCollections.apply(this, arguments);
          };
          _context2.prev = 3;
          DB_NAME = 'test';
          now = new Date();
          timestamp = now.toISOString().replace(/:/g, '-').split('.')[0];
          BACKUP_DIR = _path["default"].join(__dirname, "../public/uploads/backup/".concat(timestamp));
          if (!_fs["default"].existsSync(BACKUP_DIR)) {
            _fs["default"].mkdirSync(BACKUP_DIR, {
              recursive: true
            });
          }
          _context2.next = 11;
          return listCollections(DB_NAME);
        case 11:
          collections = _context2.sent;
          _iterator = _createForOfIteratorHelper(collections);
          _context2.prev = 13;
          _iterator.s();
        case 15:
          if ((_step = _iterator.n()).done) {
            _context2.next = 23;
            break;
          }
          collection = _step.value;
          ARCHIVE_PATH = _path["default"].join(BACKUP_DIR, "".concat(collection, ".gzip"));
          console.log("Backing up collection ".concat(collection, " to ").concat(ARCHIVE_PATH));
          _context2.next = 21;
          return backupCollection(DB_NAME, collection, ARCHIVE_PATH);
        case 21:
          _context2.next = 15;
          break;
        case 23:
          _context2.next = 28;
          break;
        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](13);
          _iterator.e(_context2.t0);
        case 28:
          _context2.prev = 28;
          _iterator.f();
          return _context2.finish(28);
        case 31:
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            message: 'Backup process completed for all collections ✅'
          });
          _context2.next = 37;
          break;
        case 34:
          _context2.prev = 34;
          _context2.t1 = _context2["catch"](3);
          next(_context2.t1);
        case 37:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 34], [13, 25, 28, 31]]);
  }));
  return function backup(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var restore = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var restoreCollection, DB_NAME, collections, _i, _Object$entries, _Object$entries$_i, collection, folder, ARCHIVE_PATH;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          restoreCollection = function _restoreCollection(dbName, collection, archivePath) {
            return new Promise(function (resolve, reject) {
              var child = (0, _child_process.spawn)('mongorestore', ["--db=".concat(dbName), "--collection=".concat(collection), "--uri=".concat(_dotenv.env.MONGODB_URI), "--archive=".concat(archivePath), '--gzip', '--drop']);
              child.stdout.on('data', function (data) {
                console.log('stdout:\n', data.toString());
              });
              child.stderr.on('data', function (data) {
                console.log('stderr:\n', data.toString());
              });
              child.on('error', function (error) {
                console.error('Error during restore process:', error);
                reject(error);
              });
              child.on('exit', function (code, signal) {
                if (code) {
                  console.error('Process exit with code:', code);
                  reject(new Error("Restore process exited with code: ".concat(code)));
                } else if (signal) {
                  console.error('Process killed with signal:', signal);
                  reject(new Error("Restore process killed with signal: ".concat(signal)));
                } else {
                  console.log("Restore is successful for collection ".concat(collection, " \u2705"));
                  resolve();
                }
              });
            });
          };
          _context3.prev = 1;
          DB_NAME = 'test';
          collections = req.body.collections;
          if (!((0, _typeof2["default"])(collections) !== 'object' || Object.keys(collections).length === 0)) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: 'Invalid or empty collections object provided'
          }));
        case 6:
          _i = 0, _Object$entries = Object.entries(collections);
        case 7:
          if (!(_i < _Object$entries.length)) {
            _context3.next = 19;
            break;
          }
          _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), collection = _Object$entries$_i[0], folder = _Object$entries$_i[1];
          ARCHIVE_PATH = _path["default"].join(__dirname, "../public/uploads/backup/".concat(folder), "".concat(collection, ".gzip"));
          if (_fs["default"].existsSync(ARCHIVE_PATH)) {
            _context3.next = 13;
            break;
          }
          console.warn("Backup file for collection ".concat(collection, " in folder ").concat(folder, " does not exist. Skipping."));
          return _context3.abrupt("continue", 16);
        case 13:
          console.log("Restoring collection ".concat(collection, " from ").concat(ARCHIVE_PATH));
          _context3.next = 16;
          return restoreCollection(DB_NAME, collection, ARCHIVE_PATH);
        case 16:
          _i++;
          _context3.next = 7;
          break;
        case 19:
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            message: 'Restore process completed for specified collections ✅'
          });
          _context3.next = 26;
          break;
        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](1);
          console.error('Error during restore operation:', _context3.t0);
          res.status(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Restore process failed ❌',
            error: _context3.t0.message
          });
        case 26:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 22]]);
  }));
  return function restore(_x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
var dataMedia = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var calculateDirectorySize, publicDirPath, totalSize;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          try {
            calculateDirectorySize = function calculateDirectorySize(directoryPath) {
              var totalSize = 0;
              var files = _fs["default"].readdirSync(directoryPath);
              files.forEach(function (file) {
                var filePath = _path["default"].join(directoryPath, file);
                var stat = _fs["default"].statSync(filePath);
                if (stat.isDirectory()) {
                  totalSize += calculateDirectorySize(filePath);
                } else {
                  totalSize += stat.size;
                }
              });
              return totalSize;
            };
            publicDirPath = _path["default"].join(__dirname, '../public');
            totalSize = calculateDirectorySize(publicDirPath);
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              totalSize: totalSize
            });
          } catch (err) {
            next(err);
          }
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function dataMedia(_x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();
var getDataUsage = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var client, dbName, db, stats, totalSizeInMB;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          client = new _mongodb.MongoClient(_dotenv.env.MONGODB_URI);
          dbName = 'test';
          _context5.prev = 2;
          _context5.next = 5;
          return client.connect();
        case 5:
          db = client.db(dbName);
          _context5.next = 8;
          return db.command({
            dbStats: 1
          });
        case 8:
          stats = _context5.sent;
          totalSizeInMB = (stats.dataSize / (1024 * 1024)).toFixed(2);
          res.status(_httpStatusCodes.StatusCodes.OK).json(totalSizeInMB);
          _context5.next = 17;
          break;
        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](2);
          console.error('Lỗi khi lấy dữ liệu sử dụng:', _context5.t0);
          res.status(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Không thể lấy dung lượng dữ liệu đã sử dụng',
            error: _context5.t0.message
          });
        case 17:
          _context5.prev = 17;
          _context5.next = 20;
          return client.close();
        case 20:
          return _context5.finish(17);
        case 21:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 13, 17, 21]]);
  }));
  return function getDataUsage(_x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();
var time = _setting["default"]["restore-backup"].time;
_nodeCron["default"].schedule(time, /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
  var req, res;
  return _regenerator["default"].wrap(function _callee6$(_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        _context6.prev = 0;
        req = {};
        res = {
          status: function status() {
            return {
              json: console.log
            };
          }
        };
        _context6.next = 5;
        return backup(req, res, function () {});
      case 5:
        _context6.next = 10;
        break;
      case 7:
        _context6.prev = 7;
        _context6.t0 = _context6["catch"](0);
        console.error('Lỗi khi thực hiện backup tự động:', _context6.t0);
      case 10:
      case "end":
        return _context6.stop();
    }
  }, _callee6, null, [[0, 7]]);
})), {
  timezone: 'Asia/Ho_Chi_Minh'
});
var dataController = {
  backup: backup,
  restore: restore,
  dataMedia: dataMedia,
  getDataUsage: getDataUsage
};
exports.dataController = dataController;