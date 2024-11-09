import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    show: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true }
);

export default mongoose.model('notification', notificationSchema);
