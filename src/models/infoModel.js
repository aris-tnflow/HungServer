import mongoose from 'mongoose';

const infoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    manage: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    keywords: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    imgIcon: {
        type: String,
    },
    imgLogin: {
        type: String,
    },
}, { timestamps: true }
);

export default mongoose.model('Info', infoSchema);
