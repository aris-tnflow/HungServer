import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    order: {
        type: Number,
    },
    description: {
        type: String,
    },
    keywords: [{
        type: String,
    }],
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group',
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
    img: {
        type: String,
    },
    edit: {
        type: Object,
    }
}, { timestamps: true }
);

pageSchema.pre('save', async function (next) {
    if (this.isNew) {
        const count = await mongoose.models.pages.countDocuments();
        this.order = count + 1;
    }
    next();
})

pageSchema.pre('findOneAndUpdate', async function (next) {
    if (this._update && this._update.content && this._update.content.html) {
        const htmlContent = this._update.content.html;
        const imgTagMatch = htmlContent.match(/<img[^>]*src="([^"]*)"[^>]*>/);
        if (imgTagMatch && imgTagMatch[1]) {
            this._update.img = imgTagMatch[1];
        }
    }
    next();
});

export default mongoose.model('pages', pageSchema);
