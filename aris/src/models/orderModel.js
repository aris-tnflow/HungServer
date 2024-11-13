"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var orderSchema = new _mongoose["default"].Schema({
  orderId: {
    type: String,
    required: true
  },
  idUser: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
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
    type: String,
    required: true
  },
  paymentMethod: {
    type: String
  },
  status: {
    type: Boolean,
    "default": false
  },
  product: [{
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  note: {
    type: String
  },
  urlPayment: {
    type: String
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('orders', orderSchema);
exports["default"] = _default;