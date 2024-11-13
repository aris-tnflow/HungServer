"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataSetting = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _crypto = require("../utils/crypto");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var settingsPath = _path["default"].join(__dirname, "../json/setting.json");
var get = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var data, settings;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _fs["default"].promises.readFile(settingsPath, 'utf-8');
        case 3:
          data = _context.sent;
          settings = JSON.parse(data);
          res.json(settings);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function get(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getKey = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var key;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          key = req.params.key;
          if (!(key !== 'api-key-google.login')) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(403).json({
            error: 'Không được phép lấy key này'
          }));
        case 4:
          _fs["default"].readFile(settingsPath, 'utf8', function (err, data) {
            if (err) {
              return res.status(500).json({
                error: 'Không thể đọc file'
              });
            }
            var settings = JSON.parse(data);
            var keys = key.split('.');
            var result = settings;
            var _iterator = _createForOfIteratorHelper(keys),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var k = _step.value;
                if (result.hasOwnProperty(k)) {
                  result = result[k];
                } else {
                  return res.status(404).json({
                    error: "Kh\xF4ng t\xECm th\u1EA5y key \"".concat(key, "\"")
                  });
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            res.json(result);
          });
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
  return function getKey(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

// const put = async (req, res, next) => {
//     try {
//         const updates = req.body;

//         fs.readFile(settingsPath, 'utf8', (err, data) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Không thể đọc file' });
//             }

//             const settings = JSON.parse(data);

//             for (const parentKey in updates) {
//                 if (settings.hasOwnProperty(parentKey)) {
//                     const parentObject = settings[parentKey];
//                     if (typeof parentObject === 'object' && !Array.isArray(parentObject)) {
//                         const childUpdates = updates[parentKey];
//                         for (const childKey in childUpdates) {
//                             if (parentObject.hasOwnProperty(childKey)) {
//                                 parentObject[childKey] = childUpdates[childKey];
//                             } else {
//                                 return res.status(400).json({ error: `Không có thuộc tính "${childKey}" trong "${parentKey}"` });
//                             }
//                         }
//                     } else {
//                         return res.status(400).json({ error: `"${parentKey}" không phải là một object` });
//                     }
//                 } else {
//                     return res.status(400).json({ error: `Không có thuộc tính "${parentKey}" trong settings` });
//                 }
//             }
//             fs.writeFile(settingsPath, JSON.stringify(settings, null, 4), (err) => {
//                 if (err) {
//                     return res.status(500).json({ error: 'Không thể ghi file' });
//                 }
//                 res.json({ message: 'Cập nhật thành công', settings });
//             });
//         });
//     } catch (error) {
//         next(error);
//     }
// };

var put = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var updates, keysToEncrypt;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          try {
            updates = req.body; // Các key mà bạn muốn mã hóa giá trị
            keysToEncrypt = ['payment-bank', 'payment-momo', 'payment-zalo', 'payment-vnpay'];
            _fs["default"].readFile(settingsPath, 'utf8', function (err, data) {
              if (err) {
                return res.status(500).json({
                  error: 'Không thể đọc file'
                });
              }
              var settings = JSON.parse(data);
              for (var parentKey in updates) {
                if (settings.hasOwnProperty(parentKey)) {
                  var parentObject = settings[parentKey];
                  if ((0, _typeof2["default"])(parentObject) === 'object' && !Array.isArray(parentObject)) {
                    var childUpdates = updates[parentKey];
                    for (var childKey in childUpdates) {
                      if (parentObject.hasOwnProperty(childKey)) {
                        if (keysToEncrypt.includes(parentKey)) {
                          parentObject[childKey] = (0, _crypto.encrypt)(childUpdates[childKey]);
                        } else {
                          parentObject[childKey] = childUpdates[childKey];
                        }
                      } else {
                        return res.status(400).json({
                          error: "Kh\xF4ng c\xF3 thu\u1ED9c t\xEDnh \"".concat(childKey, "\" trong \"").concat(parentKey, "\"")
                        });
                      }
                    }
                  } else {
                    return res.status(400).json({
                      error: "\"".concat(parentKey, "\" kh\xF4ng ph\u1EA3i l\xE0 m\u1ED9t object")
                    });
                  }
                } else {
                  return res.status(400).json({
                    error: "Kh\xF4ng c\xF3 thu\u1ED9c t\xEDnh \"".concat(parentKey, "\" trong settings")
                  });
                }
              }
              _fs["default"].writeFile(settingsPath, JSON.stringify(settings, null, 4), function (err) {
                if (err) {
                  return res.status(500).json({
                    error: 'Không thể ghi file'
                  });
                }
                res.json({
                  message: 'Cập Nhật Thành Công',
                  settings: settings
                });
              });
            });
          } catch (error) {
            next(error);
          }
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function put(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var dataSetting = {
  getKey: getKey,
  get: get,
  put: put
};
exports.dataSetting = dataSetting;