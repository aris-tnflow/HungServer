import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    province: {
        type: String,
    },
    district: {
        type: String,
    },
    ward: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false,
    },
    product: [
        {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        }
    ],
    note: {
        type: String,
    },
    urlPayment: {
        type: String,
    },
}, { timestamps: true }
);

export default mongoose.model('orders', orderSchema);
