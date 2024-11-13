"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pagesController = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _pagesModel = _interopRequireDefault(require("../models/pagesModel.js"));
var _masonryModel = _interopRequireDefault(require("../models/masonryModel"));
var _layoutModel = _interopRequireDefault(require("../models/layoutModel"));
var _coursesModel = _interopRequireDefault(require("../models/coursesModel"));
var _emailModel = _interopRequireDefault(require("../models/emailModel"));
var _groupModel = _interopRequireDefault(require("../models/groupModel"));
var _indexControllder = require("./indexControllder");
var _httpStatusCodes = require("http-status-codes");
var _excluded = ["page", "limit"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var nameMess = 'Bài viết';
var sigPage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var slug, results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          slug = req.params.slug;
          _context.next = 4;
          return (0, _indexControllder.getSigData)(nameMess, {
            slug: slug
          }, _pagesModel["default"], {
            populate: 'group',
            select: '_id name title description title keywords content slug group'
          });
        case 4:
          results = _context.sent;
          res.status(results.status).json(results.message);
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
  return function sigPage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var sigPageEdit = /*#__PURE__*/function () {
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
          }, _pagesModel["default"], {
            select: '_id name slug edit'
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
  return function sigPageEdit(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var allPage = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, skip, totalItems, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit;
          skip = (page - 1) * limit;
          _context3.next = 5;
          return _pagesModel["default"].countDocuments();
        case 5:
          totalItems = _context3.sent;
          _context3.next = 8;
          return _pagesModel["default"].find({}).sort({
            dayCreate: -1
          }).skip(skip).limit(Number(limit)).select('-content -edit');
        case 8:
          data = _context3.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            totalItems: totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: Number(page),
            newData: data
          });
          _context3.next = 15;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return function allPage(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var allGroupPage = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _req$query2, _req$query2$page, page, _req$query2$limit, limit, group, skip, groupObj, totalItems, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$query2 = req.query, _req$query2$page = _req$query2.page, page = _req$query2$page === void 0 ? 1 : _req$query2$page, _req$query2$limit = _req$query2.limit, limit = _req$query2$limit === void 0 ? 10 : _req$query2$limit;
          group = req.params.group;
          skip = (page - 1) * limit;
          _context4.next = 6;
          return _groupModel["default"].findOne({
            slug: group
          });
        case 6:
          groupObj = _context4.sent;
          if (groupObj) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
            message: 'Group not found'
          }));
        case 9:
          _context4.next = 11;
          return _pagesModel["default"].countDocuments({
            group: groupObj._id
          });
        case 11:
          totalItems = _context4.sent;
          _context4.next = 14;
          return _pagesModel["default"].find({
            group: groupObj._id
          }).sort({
            dayCreate: -1
          }).populate('group').skip(skip).limit(Number(limit)).select('-content -edit -order');
        case 14:
          data = _context4.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            totalItems: totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: Number(page),
            newData: data
          });
          _context4.next = 21;
          break;
        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 18]]);
  }));
  return function allGroupPage(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var searchPage = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var _req$query3, _req$query3$page, page, _req$query3$limit, limit, filters, searchCondition, skip, totalItems, data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$query3 = req.query, _req$query3$page = _req$query3.page, page = _req$query3$page === void 0 ? 1 : _req$query3$page, _req$query3$limit = _req$query3.limit, limit = _req$query3$limit === void 0 ? 50 : _req$query3$limit, filters = (0, _objectWithoutProperties2["default"])(_req$query3, _excluded);
          searchCondition = {};
          Object.keys(filters).forEach(function (key) {
            if (key !== 'page' && key !== 'limit') {
              if (key === 'group') {
                // Xử lý đặc biệt cho trường group là ObjectId
                searchCondition[key] = filters[key];
              } else if (filters[key] === 'true' || filters[key] === 'false') {
                // Xử lý boolean
                searchCondition[key] = filters[key] === 'true';
              } else {
                // Xử lý string với regex
                searchCondition[key] = {
                  $regex: filters[key],
                  $options: 'i'
                };
              }
            }
          });
          if (!(Object.keys(searchCondition).length === 0)) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: 'Vui lòng cung cấp điều kiện tìm kiếm.'
          }));
        case 6:
          skip = (page - 1) * limit;
          _context5.next = 9;
          return _pagesModel["default"].countDocuments(searchCondition);
        case 9:
          totalItems = _context5.sent;
          _context5.next = 12;
          return _pagesModel["default"].find(searchCondition).sort({
            order: -1
          }).skip(skip).limit(Number(limit)).select('-content -edit');
        case 12:
          data = _context5.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            totalItems: totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: Number(page),
            newData: data
          });
          _context5.next = 19;
          break;
        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 19:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 16]]);
  }));
  return function searchPage(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var addPage = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _indexControllder.addData)(nameMess, _pagesModel["default"], req.body, {
            uniqueField: 'name',
            customSlugField: 'name'
          });
        case 3:
          result = _context6.sent;
          res.status(result.status).json({
            message: result.message,
            newData: result.data
          });
          _context6.next = 10;
          break;
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function addPage(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var putPage = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var id, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _context7.next = 4;
          return (0, _indexControllder.updateData)(nameMess, _pagesModel["default"], id, req.body, {
            uniqueField: 'name'
          });
        case 4:
          result = _context7.sent;
          res.status(result.status).json({
            message: result.message,
            newData: result.data
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
  return function putPage(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var putOrder = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var pagesOrder, updatedPages, _iterator, _step, page, updatedPage;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          pagesOrder = req.body;
          updatedPages = [];
          _iterator = _createForOfIteratorHelper(pagesOrder);
          _context8.prev = 4;
          _iterator.s();
        case 6:
          if ((_step = _iterator.n()).done) {
            _context8.next = 14;
            break;
          }
          page = _step.value;
          _context8.next = 10;
          return _pagesModel["default"].findByIdAndUpdate(page._id, {
            order: page.order
          }, {
            "new": true
          }).select('-content -edit');
        case 10:
          updatedPage = _context8.sent;
          updatedPages.push(updatedPage);
        case 12:
          _context8.next = 6;
          break;
        case 14:
          _context8.next = 19;
          break;
        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](4);
          _iterator.e(_context8.t0);
        case 19:
          _context8.prev = 19;
          _iterator.f();
          return _context8.finish(19);
        case 22:
          res.status(200).json({
            message: 'Order fields updated successfully',
            newData: updatedPages
          });
          _context8.next = 28;
          break;
        case 25:
          _context8.prev = 25;
          _context8.t1 = _context8["catch"](0);
          next(_context8.t1);
        case 28:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 25], [4, 16, 19, 22]]);
  }));
  return function putOrder(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();
var copyPage = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var id, originalPage, newPageData, result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          id = req.params.id;
          _context9.next = 4;
          return _pagesModel["default"].findById(id);
        case 4:
          originalPage = _context9.sent;
          if (originalPage) {
            _context9.next = 7;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: 'Trang không tồn tại.'
          }));
        case 7:
          newPageData = _objectSpread(_objectSpread({}, originalPage.toObject()), {}, {
            name: "".concat(originalPage.name, " - Copy"),
            slug: "".concat(originalPage.slug, "-copy")
          });
          delete newPageData._id;
          _context9.next = 11;
          return (0, _indexControllder.addData)(nameMess, _pagesModel["default"], newPageData, {
            uniqueField: 'name',
            customSlugField: 'name'
          });
        case 11:
          result = _context9.sent;
          res.status(result.status).json({
            message: 'Trang đã được sao chép thành công.',
            newData: result.data
          });
          _context9.next = 18;
          break;
        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9["catch"](0);
          next(_context9.t0);
        case 18:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 15]]);
  }));
  return function copyPage(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();
var delPage = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var id, result;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          id = req.params.id;
          _context10.next = 4;
          return (0, _indexControllder.deleteData)(nameMess, _pagesModel["default"], id);
        case 4:
          result = _context10.sent;
          res.status(result.status).json({
            message: result.message,
            _id: id
          });
          _context10.next = 11;
          break;
        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          next(_context10.t0);
        case 11:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 8]]);
  }));
  return function delPage(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();
var replaceInObject = function replaceInObject(obj, oldBaseUrl, newBaseUrl) {
  if (typeof obj === 'string') {
    return obj.replace(new RegExp(oldBaseUrl, 'gi'), newBaseUrl);
  } else if (Array.isArray(obj)) {
    return obj.map(function (item) {
      return replaceInObject(item, oldBaseUrl, newBaseUrl);
    });
  } else if ((0, _typeof2["default"])(obj) === 'object') {
    var updatedObject = {};
    for (var _i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      updatedObject[key] = replaceInObject(value, oldBaseUrl, newBaseUrl);
    }
    return updatedObject;
  }
  return obj;
};

// const changeText = async (req, res, next) => {
//     const { oldDomain, newDomain } = req.body;

//     if (!oldDomain || !newDomain) {
//         return res.status(400).json({ error: 'Vui lòng cung cấp cả oldDomain và newDomain' });
//     }

//     try {
//         const updatePageResult = await pageSchema.updateMany(
//             {
//                 $or: [
//                     { 'content.html': { $regex: oldDomain, $options: 'i' } },
//                     { 'content.css': { $regex: oldDomain, $options: 'i' } },
//                     { 'content.js': { $regex: oldDomain, $options: 'i' } }
//                 ]
//             },
//             [
//                 {
//                     $set: {
//                         'content.html': {
//                             $replaceAll: {
//                                 input: '$content.html',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'content.css': {
//                             $replaceAll: {
//                                 input: '$content.css',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'content.js': {
//                             $replaceAll: {
//                                 input: '$content.js',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const pages = await pageSchema.find({ 'edit': { $type: 'object' } });
//         let updatedPagesCount = 0;

//         for (const page of pages) {
//             if (page.edit) {
//                 const editString = JSON.stringify(page.edit);
//                 if (editString.includes(oldDomain)) {
//                     const updatedEditString = editString.replace(new RegExp(oldDomain, 'g'), newDomain);
//                     page.edit = JSON.parse(updatedEditString);
//                     await page.save();
//                     updatedPagesCount++;
//                 }
//             }
//         }

//         const updateMasonryResult = await masonrySchema.updateMany(
//             { 'img.imgSrc': { $regex: oldDomain, $options: 'i' } },
//             [
//                 {
//                     $set: {
//                         'img': {
//                             $map: {
//                                 input: '$img',
//                                 as: 'image',
//                                 in: {
//                                     $mergeObjects: [
//                                         '$$image',
//                                         {
//                                             imgSrc: {
//                                                 $replaceAll: {
//                                                     input: '$$image.imgSrc',
//                                                     find: oldDomain,
//                                                     replacement: newDomain
//                                                 }
//                                             },
//                                             link: {
//                                                 $replaceAll: {
//                                                     input: '$$image.link',
//                                                     find: oldDomain,
//                                                     replacement: newDomain
//                                                 }
//                                             }
//                                         }
//                                     ]
//                                 }
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const totalUpdated = updatePageResult.modifiedCount + updatedPagesCount + updateMasonryResult.modifiedCount;

//         res.json({
//             message: 'Cập nhật thành công',

//         });

//     } catch (error) {
//         next(error);
//     }
// };

// const changeText = async (req, res, next) => {
//     const { oldDomain, newDomain } = req.body;

//     if (!oldDomain || !newDomain) {
//         return res.status(400).json({ error: 'Vui lòng cung cấp cả oldDomain và newDomain' });
//     }

//     try {
//         const updatePageResult = await pageSchema.updateMany(
//             {
//                 $or: [
//                     { 'content.html': { $regex: oldDomain, $options: 'i' } },
//                     { 'content.css': { $regex: oldDomain, $options: 'i' } },
//                     { 'content.js': { $regex: oldDomain, $options: 'i' } }
//                 ]
//             },
//             [
//                 {
//                     $set: {
//                         'content.html': {
//                             $replaceAll: {
//                                 input: '$content.html',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'content.css': {
//                             $replaceAll: {
//                                 input: '$content.css',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'content.js': {
//                             $replaceAll: {
//                                 input: '$content.js',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const pages = await pageSchema.find({ 'edit': { $type: 'object' } });
//         let updatedPagesCount = 0;
//         for (const page of pages) {
//             if (page.edit) {
//                 const editString = JSON.stringify(page.edit);
//                 if (editString.includes(oldDomain)) {
//                     const updatedEditString = editString.replace(new RegExp(oldDomain, 'g'), newDomain);
//                     page.edit = JSON.parse(updatedEditString);
//                     await page.save();
//                     updatedPagesCount++;
//                 }
//             }
//         }

//         const updateMasonryResult = await masonrySchema.updateMany(
//             { 'img.imgSrc': { $regex: oldDomain, $options: 'i' } },
//             [
//                 {
//                     $set: {
//                         'img': {
//                             $map: {
//                                 input: '$img',
//                                 as: 'image',
//                                 in: {
//                                     $mergeObjects: [
//                                         '$$image',
//                                         {
//                                             imgSrc: {
//                                                 $replaceAll: {
//                                                     input: '$$image.imgSrc',
//                                                     find: oldDomain,
//                                                     replacement: newDomain
//                                                 }
//                                             },
//                                             link: {
//                                                 $replaceAll: {
//                                                     input: '$$image.link',
//                                                     find: oldDomain,
//                                                     replacement: newDomain
//                                                 }
//                                             }
//                                         }
//                                     ]
//                                 }
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const updateLayoutResult = await layoutSchema.updateMany(
//             {
//                 $or: [
//                     { 'header': { $regex: oldDomain, $options: 'i' } },
//                     { 'footer': { $regex: oldDomain, $options: 'i' } },
//                     { 'css': { $regex: oldDomain, $options: 'i' } }
//                 ]
//             },
//             [
//                 {
//                     $set: {
//                         'header': {
//                             $replaceAll: {
//                                 input: '$header',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'footer': {
//                             $replaceAll: {
//                                 input: '$footer',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'css': {
//                             $replaceAll: {
//                                 input: '$css',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const updateCoursesResult = await coursesSchema.updateMany(
//             { 'module.children.content.html': { $regex: oldDomain, $options: 'i' } },
//             [
//                 {
//                     $set: {
//                         'module': {
//                             $map: {
//                                 input: '$module',
//                                 as: 'moduleItem',
//                                 in: {
//                                     $mergeObjects: [
//                                         '$$moduleItem',
//                                         {
//                                             children: {
//                                                 $map: {
//                                                     input: '$$moduleItem.children',
//                                                     as: 'child',
//                                                     in: {
//                                                         $mergeObjects: [
//                                                             '$$child',
//                                                             {
//                                                                 'content.html': {
//                                                                     $replaceAll: {
//                                                                         input: '$$child.content.html',
//                                                                         find: oldDomain,
//                                                                         replacement: newDomain
//                                                                     }
//                                                                 },
//                                                                 'content.css': {
//                                                                     $replaceAll: {
//                                                                         input: '$$child.content.css',
//                                                                         find: oldDomain,
//                                                                         replacement: newDomain
//                                                                     }
//                                                                 },
//                                                                 'content.js': {
//                                                                     $replaceAll: {
//                                                                         input: '$$child.content.js',
//                                                                         find: oldDomain,
//                                                                         replacement: newDomain
//                                                                     }
//                                                                 },
//                                                                 'src': {
//                                                                     $replaceAll: {
//                                                                         input: '$$child.src',
//                                                                         find: oldDomain,
//                                                                         replacement: newDomain
//                                                                     }
//                                                                 },
//                                                                 'poster': {
//                                                                     $replaceAll: {
//                                                                         input: '$$child.poster',
//                                                                         find: oldDomain,
//                                                                         replacement: newDomain
//                                                                     }
//                                                                 },
//                                                                 'thumbnailTracks': {
//                                                                     $replaceAll: {
//                                                                         input: '$$child.thumbnailTracks',
//                                                                         find: oldDomain,
//                                                                         replacement: newDomain
//                                                                     }
//                                                                 },
//                                                                 'textTracks': {
//                                                                     $map: {
//                                                                         input: '$$child.textTracks',
//                                                                         as: 'track',
//                                                                         in: {
//                                                                             $mergeObjects: [
//                                                                                 '$$track',
//                                                                                 {
//                                                                                     'src': {
//                                                                                         $replaceAll: {
//                                                                                             input: '$$track.src',
//                                                                                             find: oldDomain,
//                                                                                             replacement: newDomain
//                                                                                         }
//                                                                                     }
//                                                                                 }
//                                                                             ]
//                                                                         }
//                                                                     }
//                                                                 }
//                                                             }
//                                                         ]
//                                                     }
//                                                 }
//                                             }
//                                         }
//                                     ]
//                                 }
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const layouts = await layoutSchema.find({ 'edit': { $type: 'object' } });
//         let updatedLayoutsCount = 0;
//         for (const layout of layouts) {
//             if (layout.edit) {
//                 const editString = JSON.stringify(layout.edit);
//                 if (editString.includes(oldDomain)) {
//                     const updatedEditString = editString.replace(new RegExp(oldDomain, 'g'), newDomain);
//                     layout.edit = JSON.parse(updatedEditString);
//                     await layout.save();
//                     updatedLayoutsCount++;
//                 }
//             }
//         }

//         const totalUpdated = updateCoursesResult + updatePageResult.modifiedCount + updatedPagesCount + updateMasonryResult.modifiedCount + updateLayoutResult.modifiedCount + updatedLayoutsCount;

//         res.json({
//             message: 'Cập nhật thành công',
//             totalUpdated
//         });

//     } catch (error) {
//         next(error);
//     }
// };

// const changeText = async (req, res, next) => {
//     const { oldDomain, newDomain } = req.body;

//     if (!oldDomain || !newDomain) {
//         return res.status(400).json({ error: 'Vui lòng cung cấp cả oldDomain và newDomain' });
//     }

//     try {
//         const updatePageResult = await pageSchema.updateMany(
//             {
//                 $or: [
//                     { 'content.html': { $regex: oldDomain, $options: 'i' } },
//                     { 'content.css': { $regex: oldDomain, $options: 'i' } },
//                     { 'content.js': { $regex: oldDomain, $options: 'i' } }
//                 ]
//             },
//             [
//                 {
//                     $set: {
//                         'content.html': {
//                             $replaceAll: {
//                                 input: '$content.html',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'content.css': {
//                             $replaceAll: {
//                                 input: '$content.css',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'content.js': {
//                             $replaceAll: {
//                                 input: '$content.js',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         // Xử lý cập nhật cho Courses - module - children content.html
//         const courses = await coursesSchema.find();
//         let updatedCoursesCount = 0;

//         for (const course of courses) {
//             let courseUpdated = false;

//             course.module.forEach(module => {
//                 module.children.forEach(child => {
//                     if (child.content && child.content.html && child.content.html.includes(oldDomain)) {
//                         child.content.html = child.content.html.replace(new RegExp(oldDomain, 'g'), newDomain);
//                         courseUpdated = true;
//                     }
//                 });
//             });

//             if (courseUpdated) {
//                 await course.save();
//                 updatedCoursesCount++;
//             }
//         }

//         const updateMasonryResult = await masonrySchema.updateMany(
//             { 'img.imgSrc': { $regex: oldDomain, $options: 'i' } },
//             [
//                 {
//                     $set: {
//                         'img': {
//                             $map: {
//                                 input: '$img',
//                                 as: 'image',
//                                 in: {
//                                     $mergeObjects: [
//                                         '$$image',
//                                         {
//                                             imgSrc: {
//                                                 $replaceAll: {
//                                                     input: '$$image.imgSrc',
//                                                     find: oldDomain,
//                                                     replacement: newDomain
//                                                 }
//                                             },
//                                             link: {
//                                                 $replaceAll: {
//                                                     input: '$$image.link',
//                                                     find: oldDomain,
//                                                     replacement: newDomain
//                                                 }
//                                             }
//                                         }
//                                     ]
//                                 }
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const updateLayoutResult = await layoutSchema.updateMany(
//             {
//                 $or: [
//                     { 'header': { $regex: oldDomain, $options: 'i' } },
//                     { 'footer': { $regex: oldDomain, $options: 'i' } },
//                     { 'css': { $regex: oldDomain, $options: 'i' } }
//                 ]
//             },
//             [
//                 {
//                     $set: {
//                         'header': {
//                             $replaceAll: {
//                                 input: '$header',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'footer': {
//                             $replaceAll: {
//                                 input: '$footer',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'css': {
//                             $replaceAll: {
//                                 input: '$css',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const totalUpdated = updatePageResult.modifiedCount + updateMasonryResult.modifiedCount + updateLayoutResult.modifiedCount + updatedCoursesCount;

//         res.json({
//             message: 'Cập nhật thành công',
//             totalUpdated
//         });

//     } catch (error) {
//         next(error);
//     }
// };

var changeText = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
    var _req$body, oldDomain, newDomain, updatePageResult, courses, updatedCoursesCount, _iterator2, _step2, _loop, updateMasonryResult, updateLayoutResult, updateEmailResult, totalUpdated;
    return _regenerator["default"].wrap(function _callee11$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _req$body = req.body, oldDomain = _req$body.oldDomain, newDomain = _req$body.newDomain;
          if (!(!oldDomain || !newDomain)) {
            _context12.next = 3;
            break;
          }
          return _context12.abrupt("return", res.status(400).json({
            error: 'Vui lòng cung cấp cả oldDomain và newDomain'
          }));
        case 3:
          _context12.prev = 3;
          _context12.next = 6;
          return _pagesModel["default"].updateMany({
            $or: [{
              'content.html': {
                $regex: oldDomain,
                $options: 'i'
              }
            }, {
              'content.css': {
                $regex: oldDomain,
                $options: 'i'
              }
            }, {
              'content.js': {
                $regex: oldDomain,
                $options: 'i'
              }
            }]
          }, [{
            $set: {
              'content.html': {
                $replaceAll: {
                  input: '$content.html',
                  find: oldDomain,
                  replacement: newDomain
                }
              },
              'content.css': {
                $replaceAll: {
                  input: '$content.css',
                  find: oldDomain,
                  replacement: newDomain
                }
              },
              'content.js': {
                $replaceAll: {
                  input: '$content.js',
                  find: oldDomain,
                  replacement: newDomain
                }
              }
            }
          }]);
        case 6:
          updatePageResult = _context12.sent;
          _context12.next = 9;
          return _coursesModel["default"].find();
        case 9:
          courses = _context12.sent;
          updatedCoursesCount = 0;
          _iterator2 = _createForOfIteratorHelper(courses);
          _context12.prev = 12;
          _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
            var course, courseUpdated;
            return _regenerator["default"].wrap(function _loop$(_context11) {
              while (1) switch (_context11.prev = _context11.next) {
                case 0:
                  course = _step2.value;
                  courseUpdated = false;
                  course.module.forEach(function (module) {
                    module.children.forEach(function (child) {
                      if (child.content && child.content.html && child.content.html.includes(oldDomain)) {
                        child.content.html = child.content.html.replace(new RegExp(oldDomain, 'g'), newDomain);
                        courseUpdated = true;
                      }
                    });
                  });
                  if (!courseUpdated) {
                    _context11.next = 7;
                    break;
                  }
                  _context11.next = 6;
                  return course.save();
                case 6:
                  updatedCoursesCount++;
                case 7:
                case "end":
                  return _context11.stop();
              }
            }, _loop);
          });
          _iterator2.s();
        case 15:
          if ((_step2 = _iterator2.n()).done) {
            _context12.next = 19;
            break;
          }
          return _context12.delegateYield(_loop(), "t0", 17);
        case 17:
          _context12.next = 15;
          break;
        case 19:
          _context12.next = 24;
          break;
        case 21:
          _context12.prev = 21;
          _context12.t1 = _context12["catch"](12);
          _iterator2.e(_context12.t1);
        case 24:
          _context12.prev = 24;
          _iterator2.f();
          return _context12.finish(24);
        case 27:
          _context12.next = 29;
          return _masonryModel["default"].updateMany({
            'img.imgSrc': {
              $regex: oldDomain,
              $options: 'i'
            }
          }, [{
            $set: {
              'img': {
                $map: {
                  input: '$img',
                  as: 'image',
                  "in": {
                    $mergeObjects: ['$$image', {
                      imgSrc: {
                        $replaceAll: {
                          input: '$$image.imgSrc',
                          find: oldDomain,
                          replacement: newDomain
                        }
                      },
                      link: {
                        $replaceAll: {
                          input: '$$image.link',
                          find: oldDomain,
                          replacement: newDomain
                        }
                      }
                    }]
                  }
                }
              }
            }
          }]);
        case 29:
          updateMasonryResult = _context12.sent;
          _context12.next = 32;
          return _layoutModel["default"].updateMany({
            $or: [{
              'header': {
                $regex: oldDomain,
                $options: 'i'
              }
            }, {
              'footer': {
                $regex: oldDomain,
                $options: 'i'
              }
            }, {
              'css': {
                $regex: oldDomain,
                $options: 'i'
              }
            }]
          }, [{
            $set: {
              'header': {
                $replaceAll: {
                  input: '$header',
                  find: oldDomain,
                  replacement: newDomain
                }
              },
              'footer': {
                $replaceAll: {
                  input: '$footer',
                  find: oldDomain,
                  replacement: newDomain
                }
              },
              'css': {
                $replaceAll: {
                  input: '$css',
                  find: oldDomain,
                  replacement: newDomain
                }
              }
            }
          }]);
        case 32:
          updateLayoutResult = _context12.sent;
          _context12.next = 35;
          return _emailModel["default"].updateMany({
            'content.html': {
              $regex: oldDomain,
              $options: 'i'
            }
          }, [{
            $set: {
              'content.html': {
                $replaceAll: {
                  input: '$content.html',
                  find: oldDomain,
                  replacement: newDomain
                }
              }
            }
          }]);
        case 35:
          updateEmailResult = _context12.sent;
          totalUpdated = updatePageResult.modifiedCount + updateMasonryResult.modifiedCount + updateLayoutResult.modifiedCount + updateEmailResult.modifiedCount + updatedCoursesCount;
          res.json({
            message: 'Cập Nhật Thành Công',
            totalUpdated: totalUpdated
          });
          _context12.next = 43;
          break;
        case 40:
          _context12.prev = 40;
          _context12.t2 = _context12["catch"](3);
          next(_context12.t2);
        case 43:
        case "end":
          return _context12.stop();
      }
    }, _callee11, null, [[3, 40], [12, 21, 24, 27]]);
  }));
  return function changeText(_x31, _x32, _x33) {
    return _ref11.apply(this, arguments);
  };
}();
var pagesController = {
  putOrder: putOrder,
  sigPageEdit: sigPageEdit,
  sigPage: sigPage,
  addPage: addPage,
  allPage: allPage,
  putPage: putPage,
  delPage: delPage,
  copyPage: copyPage,
  changeText: changeText,
  searchPage: searchPage,
  allGroupPage: allGroupPage
};
exports.pagesController = pagesController;