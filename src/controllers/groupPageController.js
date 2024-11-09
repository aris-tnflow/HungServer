import groupPageSchema from "~/models/groupModel";
import { addData, updateData, deleteData, getData } from "./indexControllder";

const nameMess = 'Nhóm';

const allGroup = async (req, res, next) => {
    try {
        const results = await getData(nameMess, groupPageSchema, {
            sort: { createdAt: -1 },
        });
        res.status(results.status).json({ newData: results.message });
    } catch (error) {
        next(error);
    }
}

const addGroup = async (req, res, next) => {
    try {
        const result = await addData(nameMess, groupPageSchema, req.body, { uniqueField: 'group', customSlugField: 'group' });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const putGroup = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateData(nameMess, groupPageSchema, id, req.body, { uniqueField: 'group' });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const delGroup = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteData(nameMess, groupPageSchema, id);
        res.status(result.status).json({ message: result.message, _id: id });
    } catch (error) {
        next(error);
    }
}

const checkGroup = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const exists = await groupPageSchema.findOne({ slug });
        return res.status(200).json(!!exists);
    } catch (error) {
        next(error);
    }
}

export const groupPageController = {
    addGroup,
    allGroup,
    putGroup,
    delGroup,
    checkGroup,
}
