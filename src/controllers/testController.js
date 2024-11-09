import path from 'path';
import xlsx from 'xlsx';
import { StatusCodes } from 'http-status-codes';
import fs from 'fs';

const fileExcel = path.join(__dirname, '../public/excel');
const userFilePath = path.join(fileExcel, 'DanhSachTaiKhoan.xlsx');
const ordersFilePath = path.join(fileExcel, 'DanhSachHoaDon.xlsx');
const mergedFilePath = path.join(fileExcel, 'danh_sach_nguoi_dung_merged.xlsx');
const unmatchedOrdersFilePath = path.join(fileExcel, 'hoa_don_khong_trung.xlsx');

const mergeFiles = (userData, orderData) => {
    const mergedData = [];
    const unmatchedOrders = [...orderData];

    userData.forEach((user) => {

        const matchingOrders = orderData.filter((order) =>
            order.Email === user.Email && order.SĐT === user['Số điện thoại']
        );

        // Gộp thông tin các khóa học vào người dùng
        const courses = matchingOrders.map(order => order.Khóa_học).join(', ');

        const mergedUser = {
            ...user,
            'Khóa học đã mua': courses || 'Chưa mua'
        };

        // Thêm người dùng đã được gộp khóa học vào danh sách hợp nhất
        mergedData.push(mergedUser);

        // Xóa các đơn hàng đã trùng khớp với người dùng khỏi danh sách unmatchedOrders
        matchingOrders.forEach((order) => {
            const index = unmatchedOrders.findIndex(o => o === order);
            if (index > -1) unmatchedOrders.splice(index, 1);
        });
    });

    return { mergedData, unmatchedOrders };
};

const readExcel = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];  // Lấy sheet đầu tiên
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
};

const writeExcel = (data, filePath, sheetName) => {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
    xlsx.writeFile(workbook, filePath);
};

const post = async (req, res, next) => {
    try {
        // Đọc dữ liệu từ file người dùng và đơn hàng
        const userData = readExcel(userFilePath);
        const orderData = readExcel(ordersFilePath);

        // Gộp file và lấy các hóa đơn không trùng khớp
        const { mergedData, unmatchedOrders } = mergeFiles(userData, orderData);

        // Ghi file mới chứa danh sách người dùng đã gộp và hóa đơn không trùng
        writeExcel(mergedData, mergedFilePath, 'Danh sách người dùng');
        writeExcel(unmatchedOrders, unmatchedOrdersFilePath, 'Hóa đơn không trùng');

        res.status(StatusCodes.OK).json('OK');
    } catch (error) {
        next(error);
    }
};

export const testController = {
    post,
};
