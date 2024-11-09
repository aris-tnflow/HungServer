import { StatusCodes } from 'http-status-codes';
import slugify from 'slugify';
import userSchema from '~/models/userModel.js';
import { hashPassword, comparePassword } from '~/helpers/authHelper.js';
import { updateData, deleteData, getSigData } from "./indexControllder";
import data from '../data/all.json';
import path from 'path';
import xlsx from 'xlsx';

const nameMess = 'Người dùng';

const singleUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await getSigData(nameMess, { _id: id }, userSchema, {
            select: 'video',
        });
        res.status(results.status).json(results.message);
    } catch (error) {
        next(error);
    }
}

const addUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        await userSchema.findOne({ email }) && res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email đã tồn tại' });
        const addUser = await new userSchema({ ...req.body, password: hashedPassword, slug: slugify(name) }).save();
        res.status(StatusCodes.CREATED).json(addUser);
    } catch (error) {
        next(error);
    }
}

const allUser = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const totalItems = await userSchema.countDocuments();
        const data = await userSchema
            .find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .select('-password -video -notify -avatar -gender -address -province -district -ward -dataOld -jti');
        res.status(StatusCodes.OK).json({
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: Number(page),
            newData: data
        });
    } catch (error) {
        next(error);
    }
}

const searchUser = async (req, res, next) => {
    try {
        const { page, limit, ...filters } = req.query;
        const searchCondition = {};
        Object.keys(filters).forEach(key => {
            if (key !== 'page' && key !== 'limit') {
                searchCondition[key] = { $regex: filters[key], $options: 'i' };
            }
        });
        if (Object.keys(searchCondition).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Vui lòng cung cấp điều kiện tìm kiếm.' });
        }
        const skip = (page - 1) * limit;
        const totalItems = await userSchema.countDocuments(searchCondition);
        const data = await userSchema
            .find(searchCondition)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .select('-content -edit');
        res.status(StatusCodes.OK).json({
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: Number(page),
            newData: data
        });
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteData(nameMess, userSchema, id);
        res.status(result.status).json({ message: result.message, _id: id });
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateData(nameMess, userSchema, id, req.body);
        if (result.data) result.data.password = undefined;
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const putUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const allowedUpdates = ['password', 'gender', 'name', 'video', 'avatar', 'address', 'province', 'district', 'ward'];
        const filteredBody = Object.keys(req.body)
            .filter(key => allowedUpdates.includes(key))
            .reduce((obj, key) => {
                obj[key] = req.body[key];
                return obj;
            }, {});
        const result = await updateData(nameMess, userSchema, id, filteredBody);
        if (result.data) result.data.password = undefined;
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
};


const putVideoUser = async (req, res, next) => {
    const { id, name } = req.body;

    try {
        const user = await userSchema.findById(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const originalVideoCount = user.video.length;
        user.video = user.video.filter(video => video.name !== name);
        await user.save();
        res.status(200).send({
            message: `${originalVideoCount - user.video.length} video(s) đã được xóa.`,
            remainingVideos: user.video
        });
    } catch (error) {
        next(error);
    }
};

const putPassWord = async (req, res, next) => {
    try {
        const { userId, oldPassword, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Mật khẩu không trùng khớp' });
        }

        const user = await userSchema.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        const isMatch = await comparePassword(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu cũ không chính xác' });
        }

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: 'Đã thay đổi mật khẩu' });
    } catch (error) {
        next(error);
    }
};

const putUserForgot = async (req, res, next) => {
    try {
        const { email, password, verify } = req.body;
        const allowedUpdates = ['password', 'verify', 'dataOld'];

        const user = await userSchema.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        if (user && user.verify === verify) {
            const filteredBody = Object.keys(req.body)
                .filter(key => allowedUpdates.includes(key))
                .reduce((obj, key) => {
                    obj[key] = req.body[key];
                    return obj;
                }, {});
            const newVerifyCode = Math.floor(100000 + Math.random() * 900000).toString();
            const hashedPassword = await hashPassword(password);
            filteredBody.verify = newVerifyCode;
            filteredBody.password = hashedPassword;
            filteredBody.dataOld = false;

            const result = await updateData(nameMess, userSchema, user._id, filteredBody);
            if (result.data) result.data.password = undefined;
            res.status(result.status).json({ message: result.message, data: result.data });
        } else {
            return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: 'Mã xác nhận không đúng' });
        }
    } catch (error) {
        next(error);
    }
}

const putUsernotify = async (req, res, next) => {
    const { id } = req.params;
    const { notifyId } = req.body;

    try {
        const user = await userSchema.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.notify.includes(notifyId)) {
            return res.status(400).json({ message: 'Notification already exists' });
        }
        user.notify.push(notifyId);
        await user.save();
        return res.status(200).json({ message: 'Notification updated successfully', newData: user });
    } catch (error) {
        next(error);
    }
}

const putUserVideo = async (req, res, next) => {
    const { id } = req.params;
    const { videoId, watched, watchTime, img, title, name } = req.body;

    try {
        const user = await userSchema.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingVideo = user.video.find(video => video.videoId.toString() === videoId);
        if (existingVideo) {
            existingVideo.watched = watched;
            existingVideo.watchTime = watchTime;
            existingVideo.img = img;
            existingVideo.title = title;
            existingVideo.name = name;
            existingVideo.updatedAt = Date.now();
        } else {
            user.video.push({ videoId, watched, watchTime, name, title, img, createdAt: Date.now(), updatedAt: Date.now() });
        }

        await user.save();
        res.status(200).json('UD');
    } catch (error) {
        next(error);
    }
}

const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userSchema.findById(id);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        const newCourses = req.body.courses || [];
        const updatedCourses = [
            ...user.courses,
            ...newCourses.filter(courseId => !user.courses.some(existingCourseId => existingCourseId.equals(courseId)))
        ];
        const updatedData = {
            ...req.body,
            courses: updatedCourses
        };
        const newData = await userSchema.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(StatusCodes.OK).json(newData);
    } catch (error) {
        next(error);
    }
};

const putCoursesByEmail = async (req, res, next) => {
    try {
        const { email, courses } = req.body;

        if (!Array.isArray(email) || !Array.isArray(courses)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid input format' });
        }

        const updatedUsers = await Promise.all(email.map(async (userEmail) => {
            const user = await userSchema.findOne({ email: userEmail });

            if (!user) {
                return { email: userEmail, status: 'not found' };
            }

            const updatedCourses = [
                ...user.courses,
                ...courses.filter(courseId => !user.courses.some(existingCourseId => existingCourseId.equals(courseId)))
            ];

            const updatedUser = await userSchema.findByIdAndUpdate(
                user._id,
                { courses: updatedCourses },
                { new: true }
            );

            return { email: userEmail, status: 'updated', user: updatedUser };
        }));

        res.status(StatusCodes.OK).json(updatedUsers);
    } catch (error) {
        next(error);
    }
};

const checkEmail = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        const user = await userSchema.findOne({ email: email });
        if (user) {
            return res.status(200).json({ exists: true, jti: user.jti });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        next(error);
    }
};

const checkDataOld = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        const user = await userSchema.findOne({ email: email });
        return res.status(200).json(user.dataOld);
    } catch (error) {
        next(error);
    }
};

const checkCodeEmail = async (req, res, next) => {
    const { email, verify } = req.body;
    try {
        const user = await userSchema.findOne({ email: email });
        if (user && user.verify === verify) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        next(error);
    }
};

const dataUser = async (req, res, next) => {
    try {
        const emailMap = new Map();
        const courseMapping = {
            "47071d74-e0e2-401e-b9d5-53b20ed705f8": "66f4af27746fafa3ca05767a",
            "67d4211a-9af4-4114-aa63-ea6649dcf736": "66ea982481abd5e66b7166fc",
            "3c66d715-45c4-4ec7-b392-6ead04699cc9": "66ed4e929e69e76c7aae27b0",
        };

        // Lọc dữ liệu
        data.forEach(item => {
            const { email, courses } = item;

            // Kiểm tra xem email đã tồn tại chưa
            if (!emailMap.has(email)) {
                // Chỉ lưu lại đối tượng nếu email chưa tồn tại
                emailMap.set(email, { ...item });
            }
        });

        const result = Array.from(emailMap.values()).map(item => {
            const formattedCourses = item.courses.map(courseId => courseMapping[courseId]).filter(Boolean);
            return {
                name: item.name,
                slug: slugify(item.name),
                email: item.email,
                phone: item.phone,
                courses: formattedCourses,
                userType: 'user',
                password: 'ARISNBTN@123',
                dataOld: true,
            };
        });

        await userSchema.insertMany(result);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const userController = {
    addUser,
    allUser,
    putVideoUser,
    singleUser,
    deleteUser,
    updateUser,
    putUser,
    putUsernotify,
    putUserForgot,
    updateCourse,
    putUserVideo,
    checkEmail,
    checkCodeEmail,
    searchUser,
    putCoursesByEmail,
    dataUser,
    checkDataOld,
    putPassWord
}






