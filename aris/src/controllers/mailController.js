"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmailController = exports.emailController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _emailModel = _interopRequireDefault(require("../models/emailModel"));
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _setting = _interopRequireDefault(require("../json/setting.json"));
var _indexControllder = require("./indexControllder");
var _dotenv = require("../utils/dotenv");
var nameMess = 'email';
var sendEmail = _setting["default"]["api-key-google"].sendEmail;
var name = sendEmail.name;
var emailClient = (sendEmail === null || sendEmail === void 0 ? void 0 : sendEmail.user) || _dotenv.env.EMAIL_USER;
var passClient = (sendEmail === null || sendEmail === void 0 ? void 0 : sendEmail.password) || _dotenv.env.EMAIL_PASS;
console.log('emailClient', emailClient);
console.log('passClient', passClient);
console.log('passClient', _dotenv.env.EMAIL_USER);
console.log('passClient', _dotenv.env.EMAIL_PASS);
var transporter = _nodemailer["default"].createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: emailClient,
    pass: passClient
  },
  from: "\"".concat(name || 'Chicken War Studio', "\" <").concat(emailClient || process.env.EMAIL_USER, ">")
});
var sendMail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, email, title, content;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, title = _req$body.title, content = _req$body.content;
          if (email) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: 'Email không được để trống'
          }));
        case 4:
          if (content) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: 'Content không được để trống'
          }));
        case 6:
          _context.next = 8;
          return transporter.sendMail({
            from: "\"".concat(name || 'Chicken War Studio', "\" <").concat(emailClient || process.env.EMAIL_USER, ">"),
            to: email,
            subject: title,
            html: "1"
          });
        case 8:
          return _context.abrupt("return", res.status(_httpStatusCodes.StatusCodes.OK).json({
            message: 'Đã gửi email'
          }));
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function sendMail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var sendMailForgotPass = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body2, email, title, content, random6, htmlContent;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, title = _req$body2.title, content = _req$body2.content;
          random6 = Math.floor(100000 + Math.random() * 900000); // Cập nhật mã xác thực cho người dùng
          _context2.next = 5;
          return _userModel["default"].findOneAndUpdate({
            email: email
          }, {
            verify: random6
          });
        case 5:
          if (email) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: 'Email không được để trống'
          }));
        case 7:
          if (content) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            message: 'Content không được để trống'
          }));
        case 9:
          // Thay thế nội dung trong HTML
          htmlContent = content.html.replace(/id="otp-user">.*?</g, "id=\"otp-user\">".concat(random6, "</")).replace(/id="name-user">.*?</g, "id=\"name-user\">".concat(email, "</")); // Gửi email
          _context2.next = 12;
          return transporter.sendMail({
            from: "\"".concat(name || 'Chicken War Studio', "\" <").concat(emailClient || process.env.EMAIL_USER, ">"),
            to: email,
            subject: title,
            html: "\n               <!DOCTYPE html>\n               <html lang=\"en\">\n               <head>\n                <meta charset=\"UTF-8\" />\n                <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n                <title>Document</title>\n                <style> ".concat(content.css, " </style>\n               </head>\n               <body>\n                ").concat(htmlContent, "\n               </body>\n               </html>\n                ")
          });
        case 12:
          return _context2.abrupt("return", res.status(_httpStatusCodes.StatusCodes.OK).json({
            message: 'Đã gửi email'
          }));
        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 15]]);
  }));
  return function sendMailForgotPass(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var getEmail = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, skip, totalItems, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit;
          skip = (page - 1) * limit;
          _context3.next = 5;
          return _emailModel["default"].countDocuments();
        case 5:
          totalItems = _context3.sent;
          _context3.next = 8;
          return _emailModel["default"].find({}).sort({
            order: -1
          }).skip(skip).limit(Number(limit));
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
  return function getEmail(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var sigEmail = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var id, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return _emailModel["default"].findById(id);
        case 4:
          data = _context4.sent;
          res.status(200).json(data);
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
  return function sigEmail(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var addEmail = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _indexControllder.addData)(nameMess, _emailModel["default"], req.body, {
            uniqueField: 'name',
            customSlugField: 'name'
          });
        case 3:
          result = _context5.sent;
          res.status(result.status).json({
            message: result.message,
            newData: result.data
          });
          _context5.next = 10;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function addEmail(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var putEmail = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var id, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _context6.next = 4;
          return (0, _indexControllder.updateData)(nameMess, _emailModel["default"], id, req.body, {
            uniqueField: 'name'
          });
        case 4:
          result = _context6.sent;
          res.status(result.status).json({
            message: result.message,
            newData: result.data
          });
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function putEmail(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var delEmail = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var id, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _context7.next = 4;
          return (0, _indexControllder.deleteData)(nameMess, _emailModel["default"], id);
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
  return function delEmail(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var sendEmailController = {
  sendMail: sendMail,
  sendMailForgotPass: sendMailForgotPass
};
exports.sendEmailController = sendEmailController;
var emailController = {
  getEmail: getEmail,
  sigEmail: sigEmail,
  addEmail: addEmail,
  putEmail: putEmail,
  delEmail: delEmail
};
exports.emailController = emailController;