import mongoose from 'mongoose';

const textTrackSchema = new mongoose.Schema({
    src: { type: String },
    label: { type: String },
    language: { type: String },
    kind: { type: String, enum: ['subtitles', 'chapters'] },
    default: { type: Boolean, default: false }
}, { _id: false });

const childrenSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String },
    src: { type: String },
    public: {
        type: Boolean,
        default: false
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
    edit: { type: Object },
    key: { type: String },
    poster: { type: String },
    thumbnailTracks: { type: String },
    textTracks: [textTrackSchema],
}, { _id: false });

const moduleSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  // Tạo ID tự động cho module
    title: { type: String },
    key: { type: String },
    children: [childrenSchema]
}, { _id: false });

const coursesSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryCourse', required: true },
    price: { type: Number, required: true },
    sale: { type: Number, required: true },
    status: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    order: { type: Number },
    img: { type: String },
    imgDetail: { type: String },
    benefit: [{ type: String }],
    customer: [{ type: String }],
    output: [{ type: String }],
    prerequisite: [{ type: String }],
    hidden: [{ type: String }],
    includes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Include', required: true }],
    star: { type: String },
    module: [moduleSchema],
}, { timestamps: true });

coursesSchema.pre('save', async function (next) {
    if (this.isNew) {
        const count = await mongoose.models.Courses.countDocuments();
        this.order = count + 1;
    }
    next();
});

export default mongoose.model('Courses', coursesSchema);


