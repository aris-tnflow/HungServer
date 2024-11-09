import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Bỏ qua fileFilter để cho phép tất cả các loại tệp
const uploads = multer({
    storage: storage
});

export default uploads;
