"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchCourserController = exports.courserController = exports.courseAdminController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _indexControllder = require("./indexControllder");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _httpStatusCodes = require("http-status-codes");
var _coursesModel = _interopRequireDefault(require("../models/coursesModel.js"));
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _sharp = _interopRequireDefault(require("sharp"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; } // Image
var nameMess = 'Khóa học';
var uploadDir = _path["default"].join(__dirname, '../public/uploads/course');
var sigCourser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _results$message, slug, results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          slug = req.params.slug;
          _context.next = 4;
          return (0, _indexControllder.getSigData)(nameMess, {
            slug: slug
          }, _coursesModel["default"], {
            populate: {
              path: 'category includes',
              select: '-module' // Giữ select này nếu cần thiết
            },

            select: {
              name: 1,
              slug: 1,
              category: 1,
              price: 1,
              sale: 1,
              status: 1,
              title: 1,
              description: 1,
              order: 1,
              img: 1,
              imgDetail: 1,
              benefit: 1,
              customer: 1,
              output: 1,
              prerequisite: 1,
              hidden: 1,
              includes: 1,
              star: 1,
              'module.title': 1,
              'module.key': 1,
              'module.children.title': 1,
              'module.children.public': 1,
              'module.children.src': 1
            }
          });
        case 4:
          results = _context.sent;
          if (results !== null && results !== void 0 && (_results$message = results.message) !== null && _results$message !== void 0 && _results$message.module) {
            results.message.module = results.message.module.map(function (mod) {
              var _mod$children;
              return _objectSpread(_objectSpread({}, mod), {}, {
                children: (_mod$children = mod.children) === null || _mod$children === void 0 ? void 0 : _mod$children.map(function (child) {
                  return child["public"] ? child : _objectSpread(_objectSpread({}, child), {}, {
                    src: undefined
                  });
                })
              });
            });
          }
          res.status(results.status).json(results.message);
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function sigCourser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var sigAdmin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var slug, results;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          slug = req.params.slug;
          _context2.next = 4;
          return (0, _indexControllder.getSigData)(nameMess, {
            slug: slug
          }, _coursesModel["default"], {
            populate: 'category'
          });
        case 4:
          results = _context2.sent;
          res.status(results.status).json(results.message);
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function sigAdmin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var addCourser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _indexControllder.addData)(nameMess, _coursesModel["default"], req.body, {
            uniqueField: 'name',
            customSlugField: 'name'
          });
        case 3:
          result = _context3.sent;
          res.status(result.status).json({
            message: result.message,
            newData: result.data
          });
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function addCourser(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var putCourser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var id, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return (0, _indexControllder.updateData)(nameMess, _coursesModel["default"], id, req.body, {
            uniqueField: 'name'
          });
        case 4:
          result = _context4.sent;
          res.status(result.status).json({
            message: result.message,
            newData: result.data
          });
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function putCourser(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var updateCourseModule = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var slug, modules, course;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          slug = req.params.slug;
          modules = req.body.modules;
          _context5.next = 5;
          return _coursesModel["default"].findOne({
            slug: slug
          });
        case 5:
          course = _context5.sent;
          if (course) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Khóa học không tồn tại'
          }));
        case 8:
          course.module = modules;
          _context5.next = 11;
          return course.save();
        case 11:
          return _context5.abrupt("return", res.status(200).json({
            message: 'Cập nhật module thành công',
            course: course
          }));
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            message: 'Có lỗi xảy ra khi cập nhật module'
          }));
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 14]]);
  }));
  return function updateCourseModule(_x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();
var putOrder = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var pagesOrder, updatedPages, _iterator, _step, page, updatedPage;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          pagesOrder = req.body;
          updatedPages = [];
          _iterator = _createForOfIteratorHelper(pagesOrder);
          _context6.prev = 4;
          _iterator.s();
        case 6:
          if ((_step = _iterator.n()).done) {
            _context6.next = 14;
            break;
          }
          page = _step.value;
          _context6.next = 10;
          return _coursesModel["default"].findByIdAndUpdate(page._id, {
            order: page.order
          }, {
            "new": true
          });
        case 10:
          updatedPage = _context6.sent;
          updatedPages.push(updatedPage);
        case 12:
          _context6.next = 6;
          break;
        case 14:
          _context6.next = 19;
          break;
        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](4);
          _iterator.e(_context6.t0);
        case 19:
          _context6.prev = 19;
          _iterator.f();
          return _context6.finish(19);
        case 22:
          res.status(200).json({
            message: 'Order fields updated successfully',
            newData: updatedPages
          });
          _context6.next = 28;
          break;
        case 25:
          _context6.prev = 25;
          _context6.t1 = _context6["catch"](0);
          next(_context6.t1);
        case 28:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 25], [4, 16, 19, 22]]);
  }));
  return function putOrder(_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();
var delCourser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var id, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _context7.next = 4;
          return (0, _indexControllder.deleteData)(nameMess, _coursesModel["default"], id);
        case 4:
          result = _context7.sent;
          res.status(result.status).json({
            message: result.message,
            _id: id
          });
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return function delCourser(_x18, _x19, _x20) {
    return _ref7.apply(this, arguments);
  };
}();
var getCourser = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _coursesModel["default"].find({}).sort({
            order: -1
          }).select('-module');
        case 3:
          data = _context8.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            totalItems: data.length,
            newData: data
          });
          _context8.next = 10;
          break;
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function getCourser(_x21, _x22, _x23) {
    return _ref8.apply(this, arguments);
  };
}();
var outstandCourse = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var _req$body, ids, limit, courses;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$body = req.body, ids = _req$body.ids, limit = _req$body.limit;
          _context9.next = 4;
          return _coursesModel["default"].find({
            price: {
              $gt: 0
            },
            _id: {
              $nin: ids
            }
          }).sort({
            star: -1
          }).limit(limit).select('-hidden -includes -benefit -customer -prerequisite -module -output');
        case 4:
          courses = _context9.sent;
          res.status(200).json(courses);
          _context9.next = 11;
          break;
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          next(_context9.t0);
        case 11:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 8]]);
  }));
  return function outstandCourse(_x24, _x25, _x26) {
    return _ref9.apply(this, arguments);
  };
}();
var freeCourse = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var freeCourses;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _coursesModel["default"].find({
            price: 0
          }).select('-module');
        case 3:
          freeCourses = _context10.sent;
          res.status(200).json(freeCourses);
          _context10.next = 10;
          break;
        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          next(_context10.t0);
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return function freeCourse(_x27, _x28, _x29) {
    return _ref10.apply(this, arguments);
  };
}();
var allCourserCart = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
    var _req$body2, ids, idRemove, courses;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _req$body2 = req.body, ids = _req$body2.ids, idRemove = _req$body2.idRemove;
          if (Array.isArray(ids)) {
            _context11.next = 4;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            message: 'Lỗi: ID là một mảng'
          }));
        case 4:
          _context11.next = 6;
          return _coursesModel["default"].find({
            _id: {
              $in: ids,
              $nin: idRemove
            }
          }).select('_id name price sale slug img imgDetail star');
        case 6:
          courses = _context11.sent;
          res.status(200).json(courses);
          _context11.next = 13;
          break;
        case 10:
          _context11.prev = 10;
          _context11.t0 = _context11["catch"](0);
          next(_context11.t0);
        case 13:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 10]]);
  }));
  return function allCourserCart(_x30, _x31, _x32) {
    return _ref11.apply(this, arguments);
  };
}();
var searchCourses = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res, next) {
    var _req$query, priceRange, categoryId, query, results, _priceRange$split$map, _priceRange$split$map2, minPrice, maxPrice;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _req$query = req.query, priceRange = _req$query['price-course'], categoryId = _req$query['category-course'];
          query = {};
          if (categoryId) {
            query.category = categoryId;
          }
          _context12.next = 6;
          return _coursesModel["default"].find(query).sort({
            createdAt: -1
          }).populate('category').select('_id name price status title category slug sale img imgDetail star');
        case 6:
          results = _context12.sent;
          if (priceRange) {
            _priceRange$split$map = priceRange.split('-').map(Number), _priceRange$split$map2 = (0, _slicedToArray2["default"])(_priceRange$split$map, 2), minPrice = _priceRange$split$map2[0], maxPrice = _priceRange$split$map2[1];
            results = results.filter(function (course) {
              var finalPrice = course.price - course.price * course.sale / 100;
              return finalPrice >= minPrice && finalPrice <= maxPrice;
            });
          }
          res.status(200).json({
            newData: results
          });
          _context12.next = 14;
          break;
        case 11:
          _context12.prev = 11;
          _context12.t0 = _context12["catch"](0);
          next(_context12.t0);
        case 14:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 11]]);
  }));
  return function searchCourses(_x33, _x34, _x35) {
    return _ref12.apply(this, arguments);
  };
}();
var addImageCourses = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res, next) {
    var folder, file, fileName, fileNameOutput, folderPath, outputPath, fileSize, newFilePath;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          folder = req.body.folder;
          if (folder) {
            _context13.next = 4;
            break;
          }
          return _context13.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: 'Folder name is required'
          }));
        case 4:
          file = req.file.path;
          fileName = req.file.filename;
          fileNameOutput = "compress-".concat(fileName);
          if (file) {
            _context13.next = 9;
            break;
          }
          return _context13.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: 'Không có File được tải lên'
          }));
        case 9:
          folderPath = _path["default"].join(uploadDir, folder);
          if (_fs["default"].existsSync(folderPath)) {
            _context13.next = 13;
            break;
          }
          _context13.next = 13;
          return _fs["default"].promises.mkdir(folderPath, {
            recursive: true
          });
        case 13:
          outputPath = _path["default"].join(folderPath, fileNameOutput);
          fileSize = req.file.size;
          if (!(fileSize > 1 * 1024 * 1024)) {
            _context13.next = 23;
            break;
          }
          _context13.next = 18;
          return (0, _sharp["default"])(_fs["default"].readFileSync(file)).toFormat('jpeg').jpeg({
            quality: 80
          }).toFile(outputPath);
        case 18:
          _context13.next = 20;
          return _fs["default"].promises.unlink(file);
        case 20:
          res.status(_httpStatusCodes.StatusCodes.OK).json("course/".concat(folder, "/").concat(fileNameOutput));
          _context13.next = 27;
          break;
        case 23:
          newFilePath = _path["default"].join(folderPath, fileName);
          _context13.next = 26;
          return _fs["default"].promises.rename(file, newFilePath);
        case 26:
          res.status(_httpStatusCodes.StatusCodes.OK).json("course/".concat(folder, "/").concat(fileName));
        case 27:
          _context13.next = 32;
          break;
        case 29:
          _context13.prev = 29;
          _context13.t0 = _context13["catch"](0);
          next(_context13.t0);
        case 32:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 29]]);
  }));
  return function addImageCourses(_x36, _x37, _x38) {
    return _ref13.apply(this, arguments);
  };
}();
var getModuleUser = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res, next) {
    var course;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return _coursesModel["default"].findById(req.params.id).select('module name').lean();
        case 3:
          course = _context14.sent;
          if (course) {
            _context14.next = 6;
            break;
          }
          return _context14.abrupt("return", res.status(404).json({
            message: 'Course not found'
          }));
        case 6:
          course.module.forEach(function (mod) {
            mod.children.forEach(function (child) {
              delete child.edit;
            });
          });
          res.status(200).json(course);
          _context14.next = 13;
          break;
        case 10:
          _context14.prev = 10;
          _context14.t0 = _context14["catch"](0);
          next(_context14.t0);
        case 13:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 10]]);
  }));
  return function getModuleUser(_x39, _x40, _x41) {
    return _ref14.apply(this, arguments);
  };
}();
var getModule = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res, next) {
    var course;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return _coursesModel["default"].findById(req.params.id);
        case 3:
          course = _context15.sent;
          if (course) {
            _context15.next = 6;
            break;
          }
          return _context15.abrupt("return", res.status(404).json({
            message: 'Course not found'
          }));
        case 6:
          res.status(200).json(course.module);
          _context15.next = 12;
          break;
        case 9:
          _context15.prev = 9;
          _context15.t0 = _context15["catch"](0);
          next(_context15.t0);
        case 12:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 9]]);
  }));
  return function getModule(_x42, _x43, _x44) {
    return _ref15.apply(this, arguments);
  };
}();
var addModule = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res, next) {
    var title, course, isModuleExists, newModule;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          title = req.body.title;
          if (title) {
            _context16.next = 4;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            message: 'Tên học phần không được bỏ trống'
          }));
        case 4:
          _context16.next = 6;
          return _coursesModel["default"].findById(req.params.id);
        case 6:
          course = _context16.sent;
          if (course) {
            _context16.next = 9;
            break;
          }
          return _context16.abrupt("return", res.status(404).json({
            message: 'Course not found'
          }));
        case 9:
          isModuleExists = course.module.some(function (mod) {
            return mod.title === title;
          });
          if (!isModuleExists) {
            _context16.next = 12;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            message: 'Tên học phần đã tồn tại!'
          }));
        case 12:
          newModule = {
            _id: new _mongoose["default"].Types.ObjectId(),
            title: title,
            key: new _mongoose["default"].Types.ObjectId()
          };
          course.module.push(newModule);
          _context16.next = 16;
          return course.save();
        case 16:
          res.status(201).json({
            message: 'Thêm học phần mới thành công',
            newData: newModule
          });
          _context16.next = 22;
          break;
        case 19:
          _context16.prev = 19;
          _context16.t0 = _context16["catch"](0);
          next(_context16.t0);
        case 22:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 19]]);
  }));
  return function addModule(_x45, _x46, _x47) {
    return _ref16.apply(this, arguments);
  };
}();
var putModule = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res, next) {
    var id, _req$body3, moduleId, title, children, course, module, isModuleExists;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          id = req.params.id;
          _req$body3 = req.body, moduleId = _req$body3.moduleId, title = _req$body3.title, children = _req$body3.children;
          _context17.prev = 2;
          _context17.next = 5;
          return _coursesModel["default"].findById(id);
        case 5:
          course = _context17.sent;
          if (course) {
            _context17.next = 8;
            break;
          }
          return _context17.abrupt("return", res.status(404).json({
            message: 'Khóa học không tồn tại!'
          }));
        case 8:
          module = course.module.id(moduleId);
          if (module) {
            _context17.next = 11;
            break;
          }
          return _context17.abrupt("return", res.status(404).json({
            message: 'Module not found'
          }));
        case 11:
          isModuleExists = course.module.some(function (mod) {
            return mod.title === title;
          });
          if (!isModuleExists) {
            _context17.next = 14;
            break;
          }
          return _context17.abrupt("return", res.status(400).json({
            message: 'Tên đã tồn tại'
          }));
        case 14:
          module.title = title || module.title;
          module.children = children || module.children;
          _context17.next = 18;
          return course.save();
        case 18:
          res.status(200).json(module);
          _context17.next = 24;
          break;
        case 21:
          _context17.prev = 21;
          _context17.t0 = _context17["catch"](2);
          next(_context17.t0);
        case 24:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[2, 21]]);
  }));
  return function putModule(_x48, _x49, _x50) {
    return _ref17.apply(this, arguments);
  };
}();
var delModule = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res, next) {
    var _req$params, id, moduleId, course, module;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _req$params = req.params, id = _req$params.id, moduleId = _req$params.moduleId;
          _context18.next = 4;
          return _coursesModel["default"].findById(id);
        case 4:
          course = _context18.sent;
          if (course) {
            _context18.next = 7;
            break;
          }
          return _context18.abrupt("return", res.status(404).json({
            message: 'Course not found'
          }));
        case 7:
          module = course.module.id(moduleId);
          if (module) {
            _context18.next = 10;
            break;
          }
          return _context18.abrupt("return", res.status(404).json({
            message: 'Module not found'
          }));
        case 10:
          course.module.pull(moduleId);
          _context18.next = 13;
          return course.save();
        case 13:
          res.status(200).json({
            message: 'Xóa học phần thành công'
          });
          _context18.next = 19;
          break;
        case 16:
          _context18.prev = 16;
          _context18.t0 = _context18["catch"](0);
          next(_context18.t0);
        case 19:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 16]]);
  }));
  return function delModule(_x51, _x52, _x53) {
    return _ref18.apply(this, arguments);
  };
}();
var addModuleChildren = /*#__PURE__*/function () {
  var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(req, res, next) {
    var id, _req$body4, moduleId, title, course, module, titleExists, newModule;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          id = req.params.id;
          _req$body4 = req.body, moduleId = _req$body4.moduleId, title = _req$body4.title;
          _context19.next = 5;
          return _coursesModel["default"].findById(id);
        case 5:
          course = _context19.sent;
          if (course) {
            _context19.next = 8;
            break;
          }
          return _context19.abrupt("return", res.status(404).json({
            message: 'Course không tồn tại'
          }));
        case 8:
          if (moduleId) {
            _context19.next = 10;
            break;
          }
          return _context19.abrupt("return", res.status(400).json({
            message: 'Module ID không được bỏ trống'
          }));
        case 10:
          module = course.module.id(moduleId);
          if (module) {
            _context19.next = 13;
            break;
          }
          return _context19.abrupt("return", res.status(404).json({
            message: 'Module không tồn tại'
          }));
        case 13:
          titleExists = module.children.some(function (child) {
            return child.title === title;
          });
          if (!titleExists) {
            _context19.next = 16;
            break;
          }
          return _context19.abrupt("return", res.status(400).json({
            message: 'Tên học phần đã tồn tại!'
          }));
        case 16:
          newModule = {
            _id: new _mongoose["default"].Types.ObjectId(),
            title: title,
            key: new _mongoose["default"].Types.ObjectId()
          };
          module.children.push(newModule);
          _context19.next = 20;
          return course.save();
        case 20:
          res.status(201).json({
            message: 'Thêm bài học mới thành công',
            data: newModule
          });
          _context19.next = 26;
          break;
        case 23:
          _context19.prev = 23;
          _context19.t0 = _context19["catch"](0);
          next(_context19.t0);
        case 26:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 23]]);
  }));
  return function addModuleChildren(_x54, _x55, _x56) {
    return _ref19.apply(this, arguments);
  };
}();
var getModuleChildren = /*#__PURE__*/function () {
  var _ref20 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req, res, next) {
    var _req$params2, id, childId, course, childData;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _req$params2 = req.params, id = _req$params2.id, childId = _req$params2.childId;
          _context20.next = 4;
          return _coursesModel["default"].findById(id);
        case 4:
          course = _context20.sent;
          if (course) {
            _context20.next = 7;
            break;
          }
          return _context20.abrupt("return", res.status(404).json({
            message: 'Course không tồn tại'
          }));
        case 7:
          childData = null;
          course.module.forEach(function (module) {
            var child = module.children.id(childId);
            if (child) {
              childData = child;
            }
          });
          if (childData) {
            _context20.next = 11;
            break;
          }
          return _context20.abrupt("return", res.status(404).json({
            message: 'Child không tồn tại'
          }));
        case 11:
          res.status(200).json({
            message: 'Lấy dữ liệu bài học thành công',
            data: childData
          });
          _context20.next = 17;
          break;
        case 14:
          _context20.prev = 14;
          _context20.t0 = _context20["catch"](0);
          next(_context20.t0);
        case 17:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 14]]);
  }));
  return function getModuleChildren(_x57, _x58, _x59) {
    return _ref20.apply(this, arguments);
  };
}();
var putModuleChildren = /*#__PURE__*/function () {
  var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(req, res, next) {
    var _req$params3, id, childId, updatedChild, course, childFound;
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _req$params3 = req.params, id = _req$params3.id, childId = _req$params3.childId;
          updatedChild = req.body;
          _context21.next = 5;
          return _coursesModel["default"].findById(id);
        case 5:
          course = _context21.sent;
          if (course) {
            _context21.next = 8;
            break;
          }
          return _context21.abrupt("return", res.status(404).json({
            message: 'Course không tồn tại'
          }));
        case 8:
          childFound = false;
          course.module.forEach(function (module) {
            var child = module.children.id(childId);
            if (child) {
              // Cập nhật thông tin cho children
              child.set(updatedChild);
              childFound = true; // Đánh dấu là đã tìm thấy child
            }
          });

          // Nếu không tìm thấy child, trả về lỗi
          if (childFound) {
            _context21.next = 12;
            break;
          }
          return _context21.abrupt("return", res.status(404).json({
            message: 'Child không tồn tại'
          }));
        case 12:
          _context21.next = 14;
          return course.save();
        case 14:
          res.status(200).json({
            message: 'Cập nhật bài học thành công',
            data: updatedChild
          });
          _context21.next = 20;
          break;
        case 17:
          _context21.prev = 17;
          _context21.t0 = _context21["catch"](0);
          next(_context21.t0);
        case 20:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[0, 17]]);
  }));
  return function putModuleChildren(_x60, _x61, _x62) {
    return _ref21.apply(this, arguments);
  };
}();
var delModuleChildren = /*#__PURE__*/function () {
  var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(req, res, next) {
    var _req$params4, id, childId, course, childFound;
    return _regenerator["default"].wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          _req$params4 = req.params, id = _req$params4.id, childId = _req$params4.childId;
          _context22.next = 4;
          return _coursesModel["default"].findById(id);
        case 4:
          course = _context22.sent;
          if (course) {
            _context22.next = 7;
            break;
          }
          return _context22.abrupt("return", res.status(404).json({
            message: 'Course không tồn tại'
          }));
        case 7:
          childFound = false;
          course.module.forEach(function (module) {
            var child = module.children.id(childId);
            if (child) {
              module.children.pull(childId); // Xóa child khỏi module
              childFound = true; // Đánh dấu là đã tìm thấy child
            }
          });
          if (childFound) {
            _context22.next = 11;
            break;
          }
          return _context22.abrupt("return", res.status(404).json({
            message: 'Child không tồn tại'
          }));
        case 11:
          _context22.next = 13;
          return course.save();
        case 13:
          res.status(200).json({
            message: 'Xóa bài học thành công'
          });
          _context22.next = 19;
          break;
        case 16:
          _context22.prev = 16;
          _context22.t0 = _context22["catch"](0);
          next(_context22.t0);
        case 19:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[0, 16]]);
  }));
  return function delModuleChildren(_x63, _x64, _x65) {
    return _ref22.apply(this, arguments);
  };
}();
var checkCourseUser = /*#__PURE__*/function () {
  var _ref23 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(req, res, next) {
    var _req$body5, idUser, slugCourse, courseDetails, user, course;
    return _regenerator["default"].wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          _req$body5 = req.body, idUser = _req$body5.idUser, slugCourse = _req$body5.slugCourse;
          _context23.next = 4;
          return _coursesModel["default"].findOne({
            slug: slugCourse
          }).select('price module name img');
        case 4:
          courseDetails = _context23.sent;
          if (courseDetails) {
            _context23.next = 7;
            break;
          }
          return _context23.abrupt("return", res.status(404).json({
            message: 'Khóa học không tồn tại'
          }));
        case 7:
          if (!(courseDetails.price === 0)) {
            _context23.next = 9;
            break;
          }
          return _context23.abrupt("return", res.status(200).json({
            message: 'Khóa học miễn phí, trả về modules',
            module: courseDetails.module,
            name: courseDetails.name,
            img: courseDetails.img
          }));
        case 9:
          _context23.next = 11;
          return _userModel["default"].findById(idUser).populate('courses');
        case 11:
          user = _context23.sent;
          if (user) {
            _context23.next = 14;
            break;
          }
          return _context23.abrupt("return", res.status(404).json({
            message: 'User không tồn tại'
          }));
        case 14:
          course = user.courses.find(function (c) {
            return c.slug === slugCourse;
          });
          if (course) {
            _context23.next = 17;
            break;
          }
          return _context23.abrupt("return", res.status(400).json({
            message: 'User chưa mua khóa học này'
          }));
        case 17:
          res.status(200).json({
            message: 'User đã mua khóa học',
            module: courseDetails.module,
            name: courseDetails.name,
            img: courseDetails.img
          });
          _context23.next = 23;
          break;
        case 20:
          _context23.prev = 20;
          _context23.t0 = _context23["catch"](0);
          next(_context23.t0);
        case 23:
        case "end":
          return _context23.stop();
      }
    }, _callee23, null, [[0, 20]]);
  }));
  return function checkCourseUser(_x66, _x67, _x68) {
    return _ref23.apply(this, arguments);
  };
}();
var courserController = {
  sigCourser: sigCourser,
  addCourser: addCourser,
  getCourser: getCourser,
  sigAdmin: sigAdmin,
  putCourser: putCourser,
  putOrder: putOrder,
  delCourser: delCourser,
  allCourserCart: allCourserCart,
  outstandCourse: outstandCourse,
  addImageCourses: addImageCourses,
  updateCourseModule: updateCourseModule,
  checkCourseUser: checkCourseUser,
  freeCourse: freeCourse
};
exports.courserController = courserController;
var courseAdminController = {
  getModuleUser: getModuleUser,
  getModule: getModule,
  addModule: addModule,
  putModule: putModule,
  delModule: delModule,
  getModuleChildren: getModuleChildren,
  addModuleChildren: addModuleChildren,
  putModuleChildren: putModuleChildren,
  delModuleChildren: delModuleChildren
};
exports.courseAdminController = courseAdminController;
var searchCourserController = {
  searchCourses: searchCourses
};
exports.searchCourserController = searchCourserController;