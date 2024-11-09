import mongoose from 'mongoose';

const infoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    account: {
        type: String,
        required: true,
    },
    nameAccount: {
        type: String,
        required: true,
    },
    // momoKey1: {
    //     type: String,
    // },
    // momoKey2: {
    //     type: String,
    // },
    // zaloKey1: {
    //     type: String,
    // },
    // vnKey1: {
    //     type: String,
    // },
    // vnKey2: {
    //     type: String,
    // },
}, { timestamps: true }
);

export default mongoose.model('KeyBank', infoSchema);
