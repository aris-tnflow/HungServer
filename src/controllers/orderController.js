import orderModel from "~/models/orderModel";
import { addData, deleteData, getData } from "./indexControllder";
import { StatusCodes } from "http-status-codes";
import userModel from "~/models/userModel";
import setting from '../json/setting.json'
import cron from 'node-cron';
import path from 'path';
import xlsx from 'xlsx';
import { startOfWeek, endOfWeek } from 'date-fns';

const nameMess = 'Đơn hàng';
const { time } = setting["order"];

const addOrder = async (req, res, next) => {
    try {
        const result = await addData(nameMess, orderModel, req.body, {
            uniqueField: 'orderId',
        });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const allOrder = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const totalItems = await orderModel.countDocuments();
        const data = await orderModel
            .find({})
            .sort({ createdAt: -1 })
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

const sigOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await orderModel.find({ idUser: id });
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
}

const delOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteData(nameMess, orderModel, id);
        res.status(result.status).json({ message: result.message, _id: id });
    } catch (error) {
        next(error);
    }
}

const searchOrder = async (req, res, next) => {
    try {
        const { page = 1, limit = 50, ...filters } = req.query;
        const searchCondition = {};

        Object.keys(filters).forEach(key => {
            if (key !== 'page' && key !== 'limit') {
                if (filters[key] === 'true' || filters[key] === 'false') {
                    searchCondition[key] = filters[key] === 'true';
                } else {
                    searchCondition[key] = { $regex: filters[key], $options: 'i' };
                }
            }
        });

        if (Object.keys(searchCondition).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Vui lòng cung cấp điều kiện tìm kiếm.'
            });
        }

        const skip = (page - 1) * limit;
        const totalItems = await orderModel.countDocuments(searchCondition);
        const data = await orderModel
            .find(searchCondition)
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
};
const getOrderByOrderId = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await orderModel.findOne({ id, status: true });
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Order not found or status is not true' });
        }
        res.status(StatusCodes.OK).json(order);
    } catch (error) {
        next(error);
    }
};

const putOrderByOrderId = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { urlPayment, idOrderNew } = req.body;

        const order = await orderModel.findOne({ orderId });
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Order not found' });
        }
        order.orderId = idOrderNew;
        order.urlPayment = urlPayment;
        const result = await order.save();
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
};

const delUnpaidOrders = async (req, res, next) => {
    try {
        const result = await orderModel.deleteMany({ status: false });
        if (result.deletedCount > 0) {
            return res.status(200).json({ message: `${result.deletedCount} đơn hàng chưa thanh toán đã được xóa.` });
        } else {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng nào chưa thanh toán.' });
        }
    } catch (error) {
        next(error);
    }
}

const putOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newData = await orderModel.findOneAndUpdate({ orderId: id }, req.body, { new: true });
        res.status(StatusCodes.OK).json(newData);
    } catch (error) {
        next(error);
    }
}

const checkOrder = async (req, res, next) => {
    try {
        const { id, product, data } = req.body;
        if (!id || !product || !Array.isArray(product)) {
            return res.status(400).json({ message: 'Invalid input' });
        }
        const orders = await orderModel.find({ idUser: id });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        const isSameProductList = (products1, products2) => {
            if (products1.length !== products2.length) return false;
            products1.sort((a, b) => a.id.localeCompare(b.id));
            products2.sort((a, b) => a.id.localeCompare(b.id));

            for (let i = 0; i < products1.length; i++) {
                if (products1[i].id !== products2[i].id ||
                    products1[i].quantity !== products2[i].quantity ||
                    products1[i].price !== products2[i].price) {
                    return false;
                }
            }

            return true;
        };

        for (const order of orders) {
            if (isSameProductList(order.product, product)) {
                await orderModel.updateOne({ orderId: order.orderId }, { ...data });
                return res.status(200).json(order);
            }
        }

        return res.status(404).json({ message: 'No matching orders found' });
    } catch (error) {
        next(error);
    }
}

const dataOrder = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../data/DanhSachHoaDon.xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rawData = xlsx.utils.sheet_to_json(worksheet);

        const formattedData = rawData.map(user => ({
            orderId: user['Mã hóa đơn'] || '',
            name: `${user['Họ']} ${user['Tên']}` || '',
            email: user['Email'] || '',
            phone: user['SĐT'] || '',
            province: user['Thành phố'] || '',
            district: user['Quận/Huyện'] || '',
            ward: user['Phường/Xã'] || '',
            address: user['Địa chỉ'] || '',
            status: true,
            paymentMethod: "Chuyển Khoản Ngân Hàng",
            product: [
                {
                    id: user['Mã hóa đơn'] || '',
                    name: user['Khóa học'] || '',
                    price: user['Giá'] ? parseInt(user['Giá'].replace(/,/g, '')) : '',
                    quantity: 1,
                },
            ]
        }));

        await orderModel.insertMany(formattedData);

        res.status(200).json(formattedData);
    } catch (error) {
        next(error);
    }
};

const totalRevenue = async (req, res, next) => {
    try {
        const orders = await orderModel.find({ status: true });
        const totalRevenue = orders.reduce((sum, order) => {
            return sum + order.product.reduce((productSum, item) => productSum + (item.price * item.quantity), 0);
        }, 0);

        res.json(totalRevenue);
    } catch (error) {
        next(error);
    }
};

const totalWeeklyRevenue = async (req, res, next) => {
    try {
        const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
        const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });

        const orders = await orderModel.find({
            status: true,
            createdAt: { $gte: startDate, $lte: endDate },
        });

        const weeklyRevenue = orders.reduce((sum, order) => {
            return sum + order.product.reduce((productSum, item) => productSum + (item.price * item.quantity), 0);
        }, 0);

        res.json(weeklyRevenue);
    } catch (error) {
        next(error);
    }
};

const stats = async (req, res, next) => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
        const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });

        // Tổng đơn đặt hàng
        const totalOrders = await orderModel.countDocuments();

        // Đơn đặt hàng đã thanh toán hôm nay
        const paidOrdersToday = await orderModel.countDocuments({
            status: true,
            createdAt: { $gte: todayStart, $lte: todayEnd },
        });

        // Đơn đặt hàng chưa thanh toán hôm nay
        const unpaidOrdersToday = await orderModel.countDocuments({
            status: false,
            createdAt: { $gte: todayStart, $lte: todayEnd },
        });

        // Tổng người dùng tạo mới trong tuần này
        const newUsersThisWeek = await userModel.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate },
        });

        // Tổng người dùng từ trước đến nay
        const totalUsers = await userModel.countDocuments();

        // Đơn đặt hàng đã thanh toán trong tuần này
        const paidOrdersThisWeek = await orderModel.countDocuments({
            status: true,
            createdAt: { $gte: startDate, $lte: endDate },
        });

        res.json({
            totalOrders,
            paidOrdersToday,
            unpaidOrdersToday,
            newUsersThisWeek,
            totalUsers,
            paidOrdersThisWeek,
        });
    } catch (error) {
        next(error);
    }
};

cron.schedule(time, async () => {
    // Tạo các đối tượng giả cho req, res, và next
    const req = {}; // Tùy chỉnh theo yêu cầu của hàm delUnpaidOrders
    const res = {
        status: () => res,
        json: () => res
    };
    const next = (err) => {
        if (err) {
            console.error('Lỗi khi thực hiện backup tự động:', err);
        }
    };

    try {
        await delUnpaidOrders(req, res, next);
    } catch (error) {
        console.error('Lỗi khi thực hiện backup tự động:', error);
    }
}, {
    timezone: 'Asia/Ho_Chi_Minh'
});

export const orderController = {
    totalRevenue,
    totalWeeklyRevenue,
    stats,
    addOrder,
    allOrder,
    delOrder,
    putOrder,
    sigOrder,
    searchOrder,
    delUnpaidOrders,
    putOrderByOrderId,
    getOrderByOrderId,
    dataOrder,
    checkOrder
}
