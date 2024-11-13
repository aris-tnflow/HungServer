"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluginsScriptController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _pluginsScriptModel = _interopRequireDefault(require("../models/pluginsScriptModel"));
var addPluginsScript = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, scripts, styles, existingScripts, newScripts, existingStyles, newStyles;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, scripts = _req$body.scripts, styles = _req$body.styles; // Tìm các script đã tồn tại trong MongoDB
          _context.next = 4;
          return _pluginsScriptModel["default"].find({
            scripts: {
              $in: scripts
            }
          });
        case 4:
          existingScripts = _context.sent;
          // Lọc ra các script chưa tồn tại
          newScripts = scripts.filter(function (script) {
            return !existingScripts.some(function (existingScript) {
              return existingScript.scripts.includes(script);
            });
          }); // Tìm các style đã tồn tại trong MongoDB
          _context.next = 8;
          return _pluginsScriptModel["default"].find({
            styles: {
              $in: styles
            }
          });
        case 8:
          existingStyles = _context.sent;
          // Lọc ra các style chưa tồn tại
          newStyles = styles.filter(function (style) {
            return !existingStyles.some(function (existingStyle) {
              return existingStyle.styles.includes(style);
            });
          }); // Nếu có script hoặc style mới, cập nhật vào MongoDB
          if (!(newScripts.length > 0 || newStyles.length > 0)) {
            _context.next = 13;
            break;
          }
          _context.next = 13;
          return _pluginsScriptModel["default"].updateOne({}, {
            $addToSet: {
              scripts: {
                $each: newScripts
              },
              styles: {
                $each: newStyles
              }
            }
          }, {
            upsert: true
          } // Nếu document không tồn tại, thì tạo mới
          );
        case 13:
          res.status(_httpStatusCodes.StatusCodes.CREATED).json({
            newScripts: newScripts,
            newStyles: newStyles
          });
          _context.next = 19;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 16]]);
  }));
  return function addPluginsScript(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var allPluginsScript = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var allCategory;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _pluginsScriptModel["default"].find({}).sort({
            createdAt: -1
          });
        case 3:
          allCategory = _context2.sent;
          res.status(_httpStatusCodes.StatusCodes.CREATED).json(allCategory);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function allPluginsScript(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var delPluginsScript = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _req$body2, scripts, styles;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body2 = req.body, scripts = _req$body2.scripts, styles = _req$body2.styles;
          if (!(scripts && scripts.length > 0)) {
            _context3.next = 5;
            break;
          }
          _context3.next = 5;
          return _pluginsScriptModel["default"].updateOne({}, {
            $pull: {
              scripts: {
                $in: scripts
              }
            }
          });
        case 5:
          if (!(styles && styles.length > 0)) {
            _context3.next = 8;
            break;
          }
          _context3.next = 8;
          return _pluginsScriptModel["default"].updateOne({}, {
            $pull: {
              styles: {
                $in: styles
              }
            }
          });
        case 8:
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            message: "Scripts and styles deleted successfully"
          });
          _context3.next = 14;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function delPluginsScript(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var pluginsScriptController = {
  addPluginsScript: addPluginsScript,
  allPluginsScript: allPluginsScript,
  delPluginsScript: delPluginsScript
};
exports.pluginsScriptController = pluginsScriptController;