import mongoose from 'mongoose';

const groupPageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    svgCode: {
        type: String,
        required: true,
    },
}, { timestamps: true }
);

export default mongoose.model('Include', groupPageSchema);
