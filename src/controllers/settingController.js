import fs from 'fs';
import path from 'path';
import { encrypt } from '~/utils/crypto';

const settingsPath = path.join(__dirname, `../json/setting.json`);

const get = async (req, res, next) => {
    try {
        const data = await fs.promises.readFile(settingsPath, 'utf-8');
        const settings = JSON.parse(data);
        res.json(settings);
    } catch (error) {
        next(error);
    }
};

const getKey = async (req, res, next) => {
    try {
        const key = req.params.key;
        if (key !== 'api-key-google.login') {
            return res.status(403).json({ error: 'Không được phép lấy key này' });
        }
        fs.readFile(settingsPath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Không thể đọc file' });
            }
            const settings = JSON.parse(data);
            const keys = key.split('.');
            let result = settings;
            for (const k of keys) {
                if (result.hasOwnProperty(k)) {
                    result = result[k];
                } else {
                    return res.status(404).json({ error: `Không tìm thấy key "${key}"` });
                }
            }
            res.json(result);
        });
    } catch (error) {
        next(error);
    }
};

// const put = async (req, res, next) => {
//     try {
//         const updates = req.body;

//         fs.readFile(settingsPath, 'utf8', (err, data) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Không thể đọc file' });
//             }

//             const settings = JSON.parse(data);

//             for (const parentKey in updates) {
//                 if (settings.hasOwnProperty(parentKey)) {
//                     const parentObject = settings[parentKey];
//                     if (typeof parentObject === 'object' && !Array.isArray(parentObject)) {
//                         const childUpdates = updates[parentKey];
//                         for (const childKey in childUpdates) {
//                             if (parentObject.hasOwnProperty(childKey)) {
//                                 parentObject[childKey] = childUpdates[childKey];
//                             } else {
//                                 return res.status(400).json({ error: `Không có thuộc tính "${childKey}" trong "${parentKey}"` });
//                             }
//                         }
//                     } else {
//                         return res.status(400).json({ error: `"${parentKey}" không phải là một object` });
//                     }
//                 } else {
//                     return res.status(400).json({ error: `Không có thuộc tính "${parentKey}" trong settings` });
//                 }
//             }
//             fs.writeFile(settingsPath, JSON.stringify(settings, null, 4), (err) => {
//                 if (err) {
//                     return res.status(500).json({ error: 'Không thể ghi file' });
//                 }
//                 res.json({ message: 'Cập nhật thành công', settings });
//             });
//         });
//     } catch (error) {
//         next(error);
//     }
// };

const put = async (req, res, next) => {
    try {
        const updates = req.body;

        // Các key mà bạn muốn mã hóa giá trị
        const keysToEncrypt = ['payment-bank', 'payment-momo', 'payment-zalo', 'payment-vnpay'];

        fs.readFile(settingsPath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Không thể đọc file' });
            }

            const settings = JSON.parse(data);

            for (const parentKey in updates) {
                if (settings.hasOwnProperty(parentKey)) {
                    const parentObject = settings[parentKey];
                    if (typeof parentObject === 'object' && !Array.isArray(parentObject)) {
                        const childUpdates = updates[parentKey];
                        for (const childKey in childUpdates) {
                            if (parentObject.hasOwnProperty(childKey)) {
                                if (keysToEncrypt.includes(parentKey)) {
                                    parentObject[childKey] = encrypt(childUpdates[childKey]);
                                } else {
                                    parentObject[childKey] = childUpdates[childKey];
                                }
                            } else {
                                return res.status(400).json({ error: `Không có thuộc tính "${childKey}" trong "${parentKey}"` });
                            }
                        }
                    } else {
                        return res.status(400).json({ error: `"${parentKey}" không phải là một object` });
                    }
                } else {
                    return res.status(400).json({ error: `Không có thuộc tính "${parentKey}" trong settings` });
                }
            }

            fs.writeFile(settingsPath, JSON.stringify(settings, null, 4), (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Không thể ghi file' });
                }
                res.json({ message: 'Cập Nhật Thành Công', settings });
            });
        });
    } catch (error) {
        next(error);
    }
};

export const dataSetting = {
    getKey,
    get,
    put,
}
