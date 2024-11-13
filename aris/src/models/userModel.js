"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var userSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  userType: {
    type: String,
    required: true,
    "default": 'user'
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  dataOld: {
    type: Boolean,
    "default": false,
    required: true
  },
  verified: String,
  jti: String,
  verify: String,
  gender: String,
  activeStatus: {
    type: Boolean,
    "default": true
  },
  avatar: String,
  phone: {
    type: String,
    required: true
  },
  province: {
    type: String
  },
  district: {
    type: String
  },
  ward: {
    type: String
  },
  address: {
    type: String
  },
  courses: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Courses'
  }],
  notify: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'notification'
  }],
  video: [{
    videoId: {
      type: String
    },
    name: {
      type: String
    },
    img: {
      type: String
    },
    title: {
      type: String
    },
    watched: {
      type: Boolean,
      "default": false
    },
    watchTime: {
      type: Number
    },
    createdAt: {
      type: Date,
      "default": Date.now
    },
    updatedAt: {
      type: Date,
      "default": Date.now
    }
  }]
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('users', userSchema);
exports["default"] = _default;