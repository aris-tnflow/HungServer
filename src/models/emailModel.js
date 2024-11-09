import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    funtion: {
        type: String,
    },
    content: {
        html: {
            type: String,
        },
        css: {
            type: String,
        },
        js: {
            type: String,
        }
    },
    edit: {
        type: Object,
    }
}, { timestamps: true }
);
export default mongoose.model('emails', emailSchema);
