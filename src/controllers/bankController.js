import { StatusCodes } from 'http-status-codes';
import { addData, updateData } from './indexControllder';
import bankModel from '~/models/bankModel';

const nameMess = 'Key Bank';

const get = async (req, res, next) => {
    try {
        const allData = await bankModel.find({})
            .sort({ createdAt: -1 })
            .select('nameAccount account name');
        res.status(StatusCodes.OK).json(allData);
    } catch (error) {
        next(error);
    }
}

const getAmin = async (req, res, next) => {
    try {
        const allData = await bankModel.find({}).sort({ createdAt: -1 });
        res.status(StatusCodes.OK).json({ newData: allData });
    } catch (error) {
        next(error);
    }
}

const add = async (req, res, next) => {
    try {
        const result = await addData(nameMess, bankModel, req.body);
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const put = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateData(nameMess, bankModel, id, req.body);
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

export const bankController = {
    getAmin,
    get,
    add,
    put
}
