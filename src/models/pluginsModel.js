import mongoose from 'mongoose';

const pluginsSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    },
    expiry: {
        type: Date,
    },
    src: {
        type: String,
    },
}, { timestamps: true }
);

export default mongoose.model('Plugins', pluginsSchema);
