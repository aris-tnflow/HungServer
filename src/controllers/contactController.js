import path from 'path';
import fs from 'fs';
const uploadDir = path.join(__dirname, '../public/uploads/contacts');

const get = async (req, res, next) => {
    try {
        const { filename } = req.params;
        if (!filename) {
            return res.status(400).json({ message: 'Filename is required.' });
        }
        const filePath = path.join(uploadDir, `${filename}.json`);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File does not exist.' });
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);

        res.status(200).json({ message: 'File retrieved successfully.', data: jsonData });
    } catch (error) {
        next(error);
    }
};

const add = async (req, res, next) => {
    try {
        const { filename } = req.body;
        if (!filename) {
            return res.status(400).json({ message: 'Filename is required.' });
        }
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, `${filename}.json`);
        fs.writeFileSync(filePath, '{}', 'utf-8');
        res.status(200).json({ message: 'File created successfully.', filePath });
    } catch (error) {
        next(error);
    }
};

const put = async (req, res, next) => {
    try {
        const { filename, data } = req.body;
        if (!filename || !data) {
            return res.status(400).json({ message: 'Filename and data are required.' });
        }
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, `${filename}.json`);

        if (!fs.existsSync(filePath)) {
            const newArray = [{ ...data, "Ngày tạo": new Date(), "Cập nhập": new Date() }]; // Tạo mảng mới chứa dữ liệu
            fs.writeFileSync(filePath, JSON.stringify(newArray, null, 2), 'utf-8');
            return res.status(200).json({ message: 'File created and data saved successfully.', filePath });
        }
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        let jsonData = JSON.parse(fileContent);
        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }
        jsonData.push({ ...data, "Ngày tạo": new Date(), "Cập nhập": new Date() });

        // Ghi dữ liệu mới vào tệp
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
        res.status(200).json({ message: 'File updated successfully.', filePath });
    } catch (error) {
        next(error);
    }
};

const del = async (req, res, next) => {
    try {
        const { filename, _id } = req.body;
        if (!filename || !_id) {
            return res.status(400).json({ message: 'Filename and _id are required.' });
        }

        const filePath = path.join(uploadDir, `${filename}.json`);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File does not exist.' });
        }

        // Đọc dữ liệu từ file JSON
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Lọc bỏ phần tử có _id khớp
        const updatedData = data.filter(item => item._id !== _id);

        // Ghi dữ liệu đã cập nhật vào file JSON
        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');

        res.status(200).json({ message: 'Item deleted successfully from the file.' });
    } catch (error) {
        next(error);
    }
};


export const contactController = {
    get,
    add,
    put,
    del
}
