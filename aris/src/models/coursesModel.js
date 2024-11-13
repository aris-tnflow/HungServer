"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var textTrackSchema = new _mongoose["default"].Schema({
  src: {
    type: String
  },
  label: {
    type: String
  },
  language: {
    type: String
  },
  kind: {
    type: String,
    "enum": ['subtitles', 'chapters']
  },
  "default": {
    type: Boolean,
    "default": false
  }
}, {
  _id: false
});
var childrenSchema = new _mongoose["default"].Schema({
  _id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    auto: true
  },
  title: {
    type: String
  },
  src: {
    type: String
  },
  "public": {
    type: Boolean,
    "default": false
  },
  content: {
    html: {
      type: String
    },
    css: {
      type: String
    },
    js: {
      type: String
    }
  },
  edit: {
    type: Object
  },
  key: {
    type: String
  },
  poster: {
    type: String
  },
  thumbnailTracks: {
    type: String
  },
  textTracks: [textTrackSchema]
}, {
  _id: false
});
var moduleSchema = new _mongoose["default"].Schema({
  _id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    auto: true
  },
  // Tạo ID tự động cho module
  title: {
    type: String
  },
  key: {
    type: String
  },
  children: [childrenSchema]
}, {
  _id: false
});
var coursesSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String
  },
  category: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'CategoryCourse',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sale: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  order: {
    type: Number
  },
  img: {
    type: String
  },
  imgDetail: {
    type: String
  },
  benefit: [{
    type: String
  }],
  customer: [{
    type: String
  }],
  output: [{
    type: String
  }],
  prerequisite: [{
    type: String
  }],
  hidden: [{
    type: String
  }],
  includes: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Include',
    required: true
  }],
  star: {
    type: String
  },
  module: [moduleSchema]
}, {
  timestamps: true
});
coursesSchema.pre('save', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    var count;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!this.isNew) {
            _context.next = 5;
            break;
          }
          _context.next = 3;
          return _mongoose["default"].models.Courses.countDocuments();
        case 3:
          count = _context.sent;
          this.order = count + 1;
        case 5:
          next();
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var _default = _mongoose["default"].model('Courses', coursesSchema);
exports["default"] = _default;