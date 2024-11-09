import userModel from '../models/userModel.js';
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import { StatusCodes } from 'http-status-codes';
import slugify from 'slugify';
import { createToken } from '../utils/token';
import { protectedRoute } from '../utils/protected';
import { response } from "../utils/response";

const formatUserResponse = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    province: user.province,
    district: user.district,
    ward: user.ward,
    avatar: user.avatar,
    gender: user.gender,
    notify: user.notify,
    userType: user.userType,
    activeStatus: user.activeStatus,
    slug: user.slug,
    courses: user.courses,
    video: user.video,
});

const handleTokenAndResponse = async (res, user, successStatus = StatusCodes.ACCEPTED) => {
    const token = await createToken(user);
    const userNew = formatUserResponse(user);
    if (token) {
        return response(res, successStatus, true, { user: userNew, token }, null);
    }
    return response(res, StatusCodes.BAD_REQUEST, false, {}, "Could not generate token");
};

const register = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { phone }
            ]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, "Email Đã Tồn Tại!");
            }
            if (existingUser.phone === phone) {
                return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, "Số Điện Thoại Đã Tồn Tại!");
            }
        }

        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            ...req.body,
            password: hashedPassword,
            slug: slugify(name),
            userType: "user",
            activeStatus: true,
        }).save();

        if (!user) {
            return response(res, StatusCodes.FORBIDDEN, false, {}, "Không thể tạo người dùng");
        }

        return handleTokenAndResponse(res, user);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { name, password } = req.body;
    if (!name || !password) return response(res, StatusCodes.BAD_REQUEST, false, {}, "Please provide all information");

    try {
        const user = await userModel.findOne({ email: name });
        if (!user) return response(res, StatusCodes.NOT_FOUND, false, {}, "Tài khoản không tồn tại, vui lòng thử lại sau.");
        const matched = await comparePassword(password, user.password);
        if (!matched) return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, "Mật khẩu không chính xác, vui lòng thử lại sau.");
        if (!user.activeStatus) return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, "Tài khoản đã bị khóa, vui lòng thử lại sau.");
        return handleTokenAndResponse(res, user);
    } catch (error) {
        next(error);
    }
};

const loginGoogle = async (req, res, next) => {
    const { email, avatar, jti, jtiNew } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user && user.jti === jti) {
            user.jti = jtiNew;
            user.avatar = avatar;
            await user.save();
            return handleTokenAndResponse(res, user);
        }
        return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, "Could not authenticate");
    } catch (error) {
        next(error);
    }
};

const reAuth = async (req, res, next) => {
    const { token } = req.body;
    if (!token) return response(res, StatusCodes.BAD_REQUEST, false, {}, "No Token Found");

    try {
        const result = await protectedRoute.verifyToken(token);
        if (!result) return response(res, StatusCodes.BAD_REQUEST, false, {}, "Please Login Again");

        const user = await userModel.findById(result._id);
        if (!user || !user.activeStatus) return response(res, StatusCodes.BAD_REQUEST, false, {}, "Could not authenticate");

        return handleTokenAndResponse(res, user, StatusCodes.OK);
    } catch (error) {
        return response(res, StatusCodes.INTERNAL_SERVER_ERROR, false, {}, error.message);
    }
};

export const authController = {
    register,
    login,
    loginGoogle,
    reAuth
};
