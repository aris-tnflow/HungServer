"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.folderManagerController = exports.fileManagerController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _directoryTree = _interopRequireDefault(require("directory-tree"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _mimeTypes = _interopRequireDefault(require("mime-types"));
var _archiver = _interopRequireDefault(require("archiver"));
var _pagesModel = _interopRequireDefault(require("../models/pagesModel.js"));
var _masonryModel = _interopRequireDefault(require("../models/masonryModel"));
var _layoutModel = _interopRequireDefault(require("../models/layoutModel"));
var _coursesModel = _interopRequireDefault(require("../models/coursesModel"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var allFile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var tree;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            tree = (0, _directoryTree["default"])(_path["default"].join(__dirname, '../public/uploads'), {
              attributes: ['type', 'size', 'extension']
            });
            res.status(_httpStatusCodes.StatusCodes.OK).json(tree);
          } catch (error) {
            next(error);
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function allFile(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getAllImages = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var tree, filterImages, images;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          try {
            tree = (0, _directoryTree["default"])(_path["default"].join(__dirname, '../public/uploads'), {
              attributes: ['type', 'size', 'extension']
            });
            filterImages = function filterImages(node) {
              if (node.type === 'directory') {
                return node.children.flatMap(filterImages);
              } else {
                var mimeType = _mimeTypes["default"].lookup(node.name);
                if (mimeType && mimeType.startsWith('image/')) {
                  return [{
                    path: node.path.replace(/\\/g, '/').replace(_path["default"].join(__dirname, '../public/').replace(/\\/g, '/'), '/'),
                    name: node.name,
                    mimeType: mimeType,
                    size: node.size,
                    extension: node.extension
                  }];
                }
                return [];
              }
            }; // Get all images from the tree
            images = filterImages(tree); // Respond with the images
            res.status(_httpStatusCodes.StatusCodes.OK).json(images);
          } catch (error) {
            next(error);
          }
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getAllImages(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var filterFileType = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var fileTypes, tree;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          fileTypes = req.body.fileTypes;
          if (!(!fileTypes || !Array.isArray(fileTypes) || fileTypes.length === 0)) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            error: 'fileTypes is required and should be a non-empty array.'
          }));
        case 4:
          tree = (0, _directoryTree["default"])(_path["default"].join(__dirname, '../public/uploads'), {
            extensions: new RegExp("\\.(".concat(fileTypes.join('|'), ")$")),
            attributes: ['type', 'size', 'extension']
          });
          res.status(_httpStatusCodes.StatusCodes.OK).json(tree);
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function filterFileType(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var filesInFolder = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var folderName, folderPath, tree, formatPath, checkFileExistence, formatTree, formattedTree;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          folderName = req.body.folderName;
          if (folderName) {
            _context7.next = 4;
            break;
          }
          return _context7.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            error: 'FolderName is required.'
          }));
        case 4:
          folderPath = _path["default"].join(__dirname, '../public/', folderName);
          tree = (0, _directoryTree["default"])(folderPath, {
            attributes: ['type', 'size', 'extension']
          });
          if (!(!tree || tree.type !== 'directory')) {
            _context7.next = 8;
            break;
          }
          return _context7.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
            error: 'Folder not found or it is not a directory.'
          }));
        case 8:
          formatPath = function formatPath(filePath) {
            return filePath.replace(/\\/g, '/').replace("".concat(_path["default"].join(__dirname, '../public/').replace(/\\/g, '/')), "/");
          };
          checkFileExistence = /*#__PURE__*/function () {
            var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(fileName) {
              var regexPattern, _yield$Promise$all, _yield$Promise$all2, pageExists, masonryExists, layoutExists, coursesExists;
              return _regenerator["default"].wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    regexPattern = new RegExp(fileName, 'i');
                    _context4.next = 3;
                    return Promise.all([_pagesModel["default"].findOne({
                      $or: [{
                        'content.html': regexPattern
                      }, {
                        'content.css': regexPattern
                      }, {
                        'content.js': regexPattern
                      }]
                    }).exec(), _masonryModel["default"].findOne({
                      $or: [{
                        'img.imgSrc': regexPattern
                      }, {
                        'img.link': regexPattern
                      }]
                    }).exec(), _layoutModel["default"].findOne({
                      $or: [{
                        'header': regexPattern
                      }, {
                        'footer': regexPattern
                      }, {
                        'css': regexPattern
                      }]
                    }).exec(), _coursesModel["default"].findOne({
                      $or: [{
                        'img': regexPattern
                      }, {
                        'imgDetail': regexPattern
                      }, {
                        'module.children.src': regexPattern
                      }, {
                        'module.children.content.html': regexPattern
                      }, {
                        'module.children.content.css': regexPattern
                      }, {
                        'module.children.content.js': regexPattern
                      }]
                    }).exec()]);
                  case 3:
                    _yield$Promise$all = _context4.sent;
                    _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 4);
                    pageExists = _yield$Promise$all2[0];
                    masonryExists = _yield$Promise$all2[1];
                    layoutExists = _yield$Promise$all2[2];
                    coursesExists = _yield$Promise$all2[3];
                    return _context4.abrupt("return", !!(pageExists || masonryExists || layoutExists || coursesExists));
                  case 10:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function checkFileExistence(_x13) {
              return _ref5.apply(this, arguments);
            };
          }();
          formatTree = /*#__PURE__*/function () {
            var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(node) {
              var formattedChildren, exists;
              return _regenerator["default"].wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!(node.type === 'directory')) {
                      _context6.next = 7;
                      break;
                    }
                    _context6.next = 3;
                    return Promise.all(node.children.map( /*#__PURE__*/function () {
                      var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(child) {
                        var exists;
                        return _regenerator["default"].wrap(function _callee5$(_context5) {
                          while (1) switch (_context5.prev = _context5.next) {
                            case 0:
                              if (!(child.type === 'directory')) {
                                _context5.next = 4;
                                break;
                              }
                              return _context5.abrupt("return", _objectSpread(_objectSpread({}, child), {}, {
                                _id: child.name,
                                path: formatPath(child.path),
                                children: child.children
                              }));
                            case 4:
                              _context5.next = 6;
                              return checkFileExistence(child.name);
                            case 6:
                              exists = _context5.sent;
                              return _context5.abrupt("return", _objectSpread(_objectSpread({}, child), {}, {
                                _id: formatPath(child.path),
                                path: formatPath(child.path),
                                mimeType: _mimeTypes["default"].lookup(child.name) || 'application/octet-stream',
                                exists: exists
                              }));
                            case 8:
                            case "end":
                              return _context5.stop();
                          }
                        }, _callee5);
                      }));
                      return function (_x15) {
                        return _ref7.apply(this, arguments);
                      };
                    }()));
                  case 3:
                    formattedChildren = _context6.sent;
                    return _context6.abrupt("return", _objectSpread(_objectSpread({}, node), {}, {
                      path: formatPath(node.path),
                      children: formattedChildren
                    }));
                  case 7:
                    _context6.next = 9;
                    return checkFileExistence(node.name);
                  case 9:
                    exists = _context6.sent;
                    return _context6.abrupt("return", _objectSpread(_objectSpread({}, node), {}, {
                      path: formatPath(node.path),
                      mimeType: _mimeTypes["default"].lookup(node.name) || 'application/octet-stream',
                      exists: exists
                    }));
                  case 11:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            return function formatTree(_x14) {
              return _ref6.apply(this, arguments);
            };
          }();
          _context7.next = 13;
          return formatTree(tree);
        case 13:
          formattedTree = _context7.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            newData: formattedTree
          });
          _context7.next = 20;
          break;
        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);
        case 20:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 17]]);
  }));
  return function filesInFolder(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var delFile = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var filePath, fullPath;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          filePath = req.body.filePath;
          if (filePath) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            error: 'File path is required'
          }));
        case 4:
          fullPath = _path["default"].join(__dirname, '../public', filePath);
          _fs["default"].unlink(fullPath, function (err) {
            if (err) {
              return res.status(500).json({
                error: 'Failed to delete file',
                details: err.message
              });
            }
            res.status(200).json({
              message: 'File deleted successfully',
              _id: filePath
            });
          });
          _context8.next = 11;
          break;
        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);
        case 11:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 8]]);
  }));
  return function delFile(_x16, _x17, _x18) {
    return _ref8.apply(this, arguments);
  };
}();
var fileManagerController = {
  allFile: allFile,
  delFile: delFile,
  getAllImages: getAllImages,
  filterFileType: filterFileType,
  filesInFolder: filesInFolder
};
exports.fileManagerController = fileManagerController;
var getFolder = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var folderPath, tree, sortTree, renameTreeKeys;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          try {
            folderPath = _path["default"].join(__dirname, '../public/uploads');
            tree = (0, _directoryTree["default"])(folderPath, {
              exclude: /\.(?!$)/
            });
            sortTree = function sortTree(node) {
              if (node.children && node.children.length > 0) {
                node.children.sort(function (a, b) {
                  return a.name.localeCompare(b.name);
                });
                node.children.forEach(sortTree);
              }
            };
            renameTreeKeys = function renameTreeKeys(node) {
              node.title = node.name;
              node.key = node.path;
              delete node.name;
              if (node.children && node.children.length > 0) {
                node.children.forEach(renameTreeKeys);
              }
            };
            sortTree(tree);
            renameTreeKeys(tree);
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              newData: tree
            });
          } catch (error) {
            next(error);
          }
        case 1:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function getFolder(_x19, _x20, _x21) {
    return _ref9.apply(this, arguments);
  };
}();
var addFolder = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var _req$body, name, parentPath, folderPath;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _req$body = req.body, name = _req$body.name, parentPath = _req$body.parentPath;
          if (!(!name || !parentPath)) {
            _context10.next = 4;
            break;
          }
          return _context10.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            error: 'Name and parentPath are required.'
          }));
        case 4:
          if (!(typeof name !== 'string' || typeof parentPath !== 'string')) {
            _context10.next = 6;
            break;
          }
          return _context10.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            error: 'Name and parentPath must be strings.'
          }));
        case 6:
          folderPath = _path["default"].join(__dirname, '../public/', parentPath, name);
          if (!_fs["default"].existsSync(folderPath)) {
            _context10.next = 9;
            break;
          }
          return _context10.abrupt("return", res.status(_httpStatusCodes.StatusCodes.CONFLICT).json({
            error: 'Folder already exists.'
          }));
        case 9:
          _fs["default"].mkdirSync(folderPath, {
            recursive: true
          });
          res.status(_httpStatusCodes.StatusCodes.CREATED).json({
            message: 'Folder created successfully.',
            newData: {
              children: [],
              name: name,
              path: "".concat(parentPath, "/").concat(name),
              size: 0,
              type: 'directory'
            }
          });
          _context10.next = 16;
          break;
        case 13:
          _context10.prev = 13;
          _context10.t0 = _context10["catch"](0);
          next(_context10.t0);
        case 16:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 13]]);
  }));
  return function addFolder(_x22, _x23, _x24) {
    return _ref10.apply(this, arguments);
  };
}();
var putFolder = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
    var _req$body2, oldName, newName, parentPath, oldFolderPath, newFolderPath;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _req$body2 = req.body, oldName = _req$body2.oldName, newName = _req$body2.newName, parentPath = _req$body2.parentPath;
          if (!(!oldName || !newName || !parentPath)) {
            _context11.next = 4;
            break;
          }
          return _context11.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            error: 'oldName, newName, and parentPath are required.'
          }));
        case 4:
          oldFolderPath = _path["default"].join(__dirname, '../public/', parentPath, oldName);
          newFolderPath = _path["default"].join(__dirname, '../public/', parentPath, newName);
          if (_fs["default"].existsSync(oldFolderPath)) {
            _context11.next = 8;
            break;
          }
          return _context11.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
            error: 'The old folder does not exist.'
          }));
        case 8:
          if (!_fs["default"].existsSync(newFolderPath)) {
            _context11.next = 10;
            break;
          }
          return _context11.abrupt("return", res.status(_httpStatusCodes.StatusCodes.CONFLICT).json({
            error: 'The new folder name already exists.'
          }));
        case 10:
          _fs["default"].renameSync(oldFolderPath, newFolderPath);
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            message: 'Folder renamed successfully.',
            path: newFolderPath
          });
          _context11.next = 17;
          break;
        case 14:
          _context11.prev = 14;
          _context11.t0 = _context11["catch"](0);
          next(_context11.t0);
        case 17:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 14]]);
  }));
  return function putFolder(_x25, _x26, _x27) {
    return _ref11.apply(this, arguments);
  };
}();
var delFolder = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res, next) {
    var _req$body3, namefolder, parentPath, folderPath;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _req$body3 = req.body, namefolder = _req$body3.namefolder, parentPath = _req$body3.parentPath;
          if (!(!namefolder || !parentPath)) {
            _context12.next = 4;
            break;
          }
          return _context12.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            error: 'Name and parentPath are required.'
          }));
        case 4:
          folderPath = _path["default"].join(__dirname, '../public/', parentPath, namefolder);
          if (_fs["default"].existsSync(folderPath)) {
            _context12.next = 7;
            break;
          }
          return _context12.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
            error: 'Folder not found.'
          }));
        case 7:
          _fs["default"].rmdirSync(folderPath, {
            recursive: true
          });
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            message: 'Folder deleted successfully.',
            _id: namefolder
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
  return function delFolder(_x28, _x29, _x30) {
    return _ref12.apply(this, arguments);
  };
}();
var dowFolder = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res, next) {
    var folderPath, fullPath, zipFileName, output, archive, outputStream;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          folderPath = req.body.folderPath;
          if (folderPath) {
            _context13.next = 4;
            break;
          }
          return _context13.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            error: 'Folder path is required.'
          }));
        case 4:
          fullPath = _path["default"].join(__dirname, '../public', folderPath);
          if (_fs["default"].existsSync(fullPath)) {
            _context13.next = 7;
            break;
          }
          return _context13.abrupt("return", res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({
            error: 'Folder does not exist.'
          }));
        case 7:
          zipFileName = _path["default"].basename(folderPath) + '.zip';
          output = _path["default"].join(__dirname, '../public/', zipFileName);
          archive = (0, _archiver["default"])('zip', {
            zlib: {
              level: 9
            }
          });
          outputStream = _fs["default"].createWriteStream(output); // Bắt lỗi
          archive.on('error', function (err) {
            throw err;
          });

          // Khi file zip đã sẵn sàng
          outputStream.on('close', function () {
            res.status(_httpStatusCodes.StatusCodes.OK).download(output);
          });

          // Bắt đầu nén thư mục
          archive.pipe(outputStream);
          archive.directory(fullPath, false);
          archive.finalize();
          _context13.next = 21;
          break;
        case 18:
          _context13.prev = 18;
          _context13.t0 = _context13["catch"](0);
          next(_context13.t0);
        case 21:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 18]]);
  }));
  return function dowFolder(_x31, _x32, _x33) {
    return _ref13.apply(this, arguments);
  };
}();
var folderManagerController = {
  getFolder: getFolder,
  addFolder: addFolder,
  putFolder: putFolder,
  delFolder: delFolder,
  dowFolder: dowFolder
};
exports.folderManagerController = folderManagerController;