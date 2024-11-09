import { StatusCodes } from 'http-status-codes';
import infoModel from '../models/infoModel';
import { addData, updateData } from './indexControllder';

const nameMess = 'Thông tin';

const get = async (req, res, next) => {
    try {
        const allData = await infoModel.find({}).sort({ createdAt: -1 });
        res.status(StatusCodes.OK).json({ newData: allData });
    } catch (error) {
        next(error);
    }
}

const add = async (req, res, next) => {
    try {
        const result = await addData(nameMess, infoModel, req.body);
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const put = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateData(nameMess, infoModel, id, req.body);
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

export const infoController = {
    get,
    add,
    put
}
