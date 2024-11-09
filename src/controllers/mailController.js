import { StatusCodes } from 'http-status-codes';
import nodemailer from 'nodemailer';
import emailModel from '~/models/emailModel';
import userModel from '~/models/userModel';
import setting from '../json/setting.json'

import { addData, deleteData, updateData } from './indexControllder';
import { env } from '~/utils/dotenv';

const nameMess = 'email';
const { sendEmail } = setting["api-key-google"];

const name = sendEmail.name;
const emailClient = sendEmail?.user || env.EMAIL_USER;
const passClient = sendEmail?.password || env.EMAIL_PASS;

console.log('emailClient', emailClient);
console.log('passClient', passClient);
console.log('passClient', env.EMAIL_USER);
console.log('passClient', env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: emailClient,
        pass: passClient,
    },
    from: `"${name || 'Chicken War Studio'}" <${emailClient || process.env.EMAIL_USER}>`,
});

const sendMail = async (req, res, next) => {
    try {
        const { email, title, content } = req.body;
        if (!email) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email không được để trống' });
        }
        if (!content) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Content không được để trống' });
        }
        await transporter.sendMail({
            from: `"${name || 'Chicken War Studio'}" <${emailClient || process.env.EMAIL_USER}>`,
            to: email,
            subject: title,
            html: "1",
        });
        return res.status(StatusCodes.OK).json({ message: 'Đã gửi email' });
    } catch (error) {
        next(error);
    }
}

const sendMailForgotPass = async (req, res, next) => {
    try {
        const { email, title, content } = req.body;
        const random6 = Math.floor(100000 + Math.random() * 900000);

        // Cập nhật mã xác thực cho người dùng
        await userModel.findOneAndUpdate({ email: email }, { verify: random6 });

        // Kiểm tra thông tin đầu vào
        if (!email) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email không được để trống' });
        }
        if (!content) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Content không được để trống' });
        }

        // Thay thế nội dung trong HTML
        const htmlContent = content.html
            .replace(/id="otp-user">.*?</g, `id="otp-user">${random6}</`)
            .replace(/id="name-user">.*?</g, `id="name-user">${email}</`);

        // Gửi email
        await transporter.sendMail({
            from: `"${name || 'Chicken War Studio'}" <${emailClient || process.env.EMAIL_USER}>`,
            to: email,
            subject: title,
            html:
                `
               <!DOCTYPE html>
               <html lang="en">
               <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
                <style> ${content.css} </style>
               </head>
               <body>
                ${htmlContent}
               </body>
               </html>
                `,
        });

        return res.status(StatusCodes.OK).json({ message: 'Đã gửi email' });
    } catch (error) {
        next(error);
    }
}

const getEmail = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const totalItems = await emailModel.countDocuments();
        const data = await emailModel
            .find({})
            .sort({ order: -1 })
            .skip(skip)
            .limit(Number(limit))
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

const sigEmail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await emailModel.findById(id);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const addEmail = async (req, res, next) => {
    try {
        const result = await addData(nameMess, emailModel, req.body, { uniqueField: 'name', customSlugField: 'name' });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const putEmail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateData(nameMess, emailModel, id, req.body, { uniqueField: 'name' });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const delEmail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteData(nameMess, emailModel, id);
        res.status(result.status).json({ message: result.message, _id: id });
    } catch (error) {
        next(error);
    }
}

export const sendEmailController = {
    sendMail,
    sendMailForgotPass
};

export const emailController = {
    getEmail,
    sigEmail,
    addEmail,
    putEmail,
    delEmail
};

