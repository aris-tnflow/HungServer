import notificationModel from "~/models/notification";
import { addData, updateData, deleteData } from "./indexControllder";
import { StatusCodes } from "http-status-codes";

const nameMess = 'Thông báo';

const all = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, type } = req.query;
        const skip = (page - 1) * limit;
        const query = {};
        if (type) {
            query.type = type;
        }
        const totalItems = await notificationModel.countDocuments(query);
        const data = await notificationModel
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

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

const add = async (req, res, next) => {
    try {
        const result = await addData(nameMess, notificationModel, req.body, { uniqueField: 'title', customSlugField: 'title' });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const put = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateData(nameMess, notificationModel, id, req.body, { uniqueField: 'title' });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const del = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteData(nameMess, notificationModel, id);
        res.status(result.status).json({ message: result.message, _id: id });
    } catch (error) {
        next(error);
    }
}

export const notificationController = {
    add,
    all,
    put,
    del,
}
