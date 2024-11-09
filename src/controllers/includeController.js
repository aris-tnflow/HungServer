import inCludeModel from "~/models/inCludeModel";
import { addData, updateData, deleteData, getData } from "./indexControllder";

const nameMess = 'Bao gồm';

const all = async (req, res, next) => {
    try {
        const results = await getData(nameMess, inCludeModel, {
            sort: { createdAt: -1 },
        });
        res.status(results.status).json({ newData: results.message });
    } catch (error) {
        next(error);
    }
}

const add = async (req, res, next) => {
    try {
        const result = await addData(nameMess, inCludeModel, req.body, { uniqueField: 'name' });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const put = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateData(nameMess, inCludeModel, id, req.body, { uniqueField: 'name' });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const del = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteData(nameMess, inCludeModel, id);
        res.status(result.status).json({ message: result.message, _id: id });
    } catch (error) {
        next(error);
    }
}

export const includeController = {
    add,
    all,
    put,
    del,
}
