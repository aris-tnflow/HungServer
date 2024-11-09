import { StatusCodes } from "http-status-codes";
import pluginsModel from "~/models/pluginsModel";
import jsPluginsModel from "~/models/jsPluginsModel";
import cssPluginsModel from "~/models/cssPluginsModel";
import path from 'path';
import { addData, deleteData, updateData } from "./indexControllder";

const nameMess = 'Plugins';

const addFileEV = async (req, res, next) => {
    try {
        const files = req.files;
        const promises = files.map(async (file) => {
            const extension = path.extname(file.originalname).toLowerCase();

            if (extension === '.css') {
                await cssPluginsModel.create({ link: `/plugins/ev/${file.filename}` });
            } else if (extension === '.js') {
                await jsPluginsModel.create({ link: `/plugins/ev/${file.filename}` });
            } else {
                throw new Error(`Unsupported file type: ${extension}`);
            }
        });
        await Promise.all(promises);
        res.status(StatusCodes.CREATED).json({ message: 'Files uploaded successfully' });
    } catch (error) {
        next(error);
    }
};

const addFilePlugins = async (req, res, next) => {
    try {
        res.status(200).json({ message: "Đã thêm plugins", src: `/plugins/${req.file.filename}` });
    } catch (error) {
        next(error);
    }
};

const all = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const totalItems = await pluginsModel.countDocuments();
        const data = await pluginsModel
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

const add = async (req, res, next) => {
    try {
        const result = await addData(nameMess, pluginsModel, req.body, { uniqueField: 'id' });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const put = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateData(nameMess, pluginsModel, id, req.body, { uniqueField: 'id' });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const del = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteData(nameMess, pluginsModel, id);
        res.status(result.status).json({ message: result.message, _id: id });
    } catch (error) {
        next(error);
    }
}

export const pluginsController = {
    addFileEV,
    addFilePlugins,
    all,
    del,
    add,
    put
}