"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _path = _interopRequireDefault(require("path"));
var _xlsx = _interopRequireDefault(require("xlsx"));
var _httpStatusCodes = require("http-status-codes");
var _fs = _interopRequireDefault(require("fs"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var fileExcel = _path["default"].join(__dirname, '../public/excel');
var userFilePath = _path["default"].join(fileExcel, 'DanhSachTaiKhoan.xlsx');
var ordersFilePath = _path["default"].join(fileExcel, 'DanhSachHoaDon.xlsx');
var mergedFilePath = _path["default"].join(fileExcel, 'danh_sach_nguoi_dung_merged.xlsx');
var unmatchedOrdersFilePath = _path["default"].join(fileExcel, 'hoa_don_khong_trung.xlsx');
var mergeFiles = function mergeFiles(userData, orderData) {
  var mergedData = [];
  var unmatchedOrders = (0, _toConsumableArray2["default"])(orderData);
  userData.forEach(function (user) {
    var matchingOrders = orderData.filter(function (order) {
      return order.Email === user.Email && order.SĐT === user['Số điện thoại'];
    });

    // Gộp thông tin các khóa học vào người dùng
    var courses = matchingOrders.map(function (order) {
      return order.Khóa_học;
    }).join(', ');
    var mergedUser = _objectSpread(_objectSpread({}, user), {}, {
      'Khóa học đã mua': courses || 'Chưa mua'
    });

    // Thêm người dùng đã được gộp khóa học vào danh sách hợp nhất
    mergedData.push(mergedUser);

    // Xóa các đơn hàng đã trùng khớp với người dùng khỏi danh sách unmatchedOrders
    matchingOrders.forEach(function (order) {
      var index = unmatchedOrders.findIndex(function (o) {
        return o === order;
      });
      if (index > -1) unmatchedOrders.splice(index, 1);
    });
  });
  return {
    mergedData: mergedData,
    unmatchedOrders: unmatchedOrders
  };
};
var readExcel = function readExcel(filePath) {
  var workbook = _xlsx["default"].readFile(filePath);
  var sheetName = workbook.SheetNames[0]; // Lấy sheet đầu tiên
  var sheet = workbook.Sheets[sheetName];
  return _xlsx["default"].utils.sheet_to_json(sheet);
};
var writeExcel = function writeExcel(data, filePath, sheetName) {
  var workbook = _xlsx["default"].utils.book_new();
  var worksheet = _xlsx["default"].utils.json_to_sheet(data);
  _xlsx["default"].utils.book_append_sheet(workbook, worksheet, sheetName);
  _xlsx["default"].writeFile(workbook, filePath);
};
var post = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var userData, orderData, _mergeFiles, mergedData, unmatchedOrders;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            // Đọc dữ liệu từ file người dùng và đơn hàng
            userData = readExcel(userFilePath);
            orderData = readExcel(ordersFilePath); // Gộp file và lấy các hóa đơn không trùng khớp
            _mergeFiles = mergeFiles(userData, orderData), mergedData = _mergeFiles.mergedData, unmatchedOrders = _mergeFiles.unmatchedOrders; // Ghi file mới chứa danh sách người dùng đã gộp và hóa đơn không trùng
            writeExcel(mergedData, mergedFilePath, 'Danh sách người dùng');
            writeExcel(unmatchedOrders, unmatchedOrdersFilePath, 'Hóa đơn không trùng');
            res.status(_httpStatusCodes.StatusCodes.OK).json('OK');
          } catch (error) {
            next(error);
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function post(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var testController = {
  post: post
};
exports.testController = testController;