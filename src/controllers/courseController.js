import { addData, updateData, deleteData, getData, getSigData } from "./indexControllder";
import fs from 'fs';
import path from 'path';
import { StatusCodes } from "http-status-codes";
import coursesSchema from "~/models/coursesModel.js";
import userSchema from "~/models/userModel";

// Image
import sharp from 'sharp';
import mongoose from "mongoose";

const nameMess = 'Khóa học';
const uploadDir = path.join(__dirname, '../public/uploads/course');

const sigCourser = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const results = await getSigData(
            nameMess,
            { slug: slug },
            coursesSchema,
            {
                populate: {
                    path: 'category includes',
                    select: '-module' // Giữ select này nếu cần thiết
                },
                select: {
                    name: 1,
                    slug: 1,
                    category: 1,
                    price: 1,
                    sale: 1,
                    status: 1,
                    title: 1,
                    description: 1,
                    order: 1,
                    img: 1,
                    imgDetail: 1,
                    benefit: 1,
                    customer: 1,
                    output: 1,
                    prerequisite: 1,
                    hidden: 1,
                    includes: 1,
                    star: 1,
                    'module.title': 1,
                    'module.key': 1,
                    'module.children.title': 1,
                    'module.children.public': 1,
                    'module.children.src': 1
                }
            }
        );

        if (results?.message?.module) {
            results.message.module = results.message.module.map((mod) => ({
                ...mod,
                children: mod.children?.map((child) =>
                    child.public ? child : { ...child, src: undefined }
                )
            }));
        }

        res.status(results.status).json(results.message);
    } catch (error) {
        next(error);
    }
};


const sigAdmin = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const results = await getSigData(nameMess, { slug: slug }, coursesSchema, { populate: 'category' });
        res.status(results.status).json(results.message);
    } catch (error) {
        next(error);
    }
}

const addCourser = async (req, res, next) => {
    try {
        const result = await addData(nameMess, coursesSchema, req.body, { uniqueField: 'name', customSlugField: 'name' });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
};

const putCourser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateData(nameMess, coursesSchema, id, req.body, { uniqueField: 'name' });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const updateCourseModule = async (req, res) => {
    try {
        const { slug } = req.params;
        const { modules } = req.body;
        const course = await coursesSchema.findOne({ slug: slug });
        if (!course) {
            return res.status(404).json({ message: 'Khóa học không tồn tại' });
        }
        course.module = modules;
        await course.save();
        return res.status(200).json({ message: 'Cập nhật module thành công', course });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật module' });
    }
};

const putOrder = async (req, res, next) => {
    try {
        const pagesOrder = req.body;
        const updatedPages = [];

        for (const page of pagesOrder) {
            // .select('-content -edit')
            const updatedPage = await coursesSchema.findByIdAndUpdate(page._id, { order: page.order }, { new: true });
            updatedPages.push(updatedPage);
        }
        res.status(200).json({ message: 'Order fields updated successfully', newData: updatedPages });
    } catch (error) {
        next(error);
    }
}

const delCourser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteData(nameMess, coursesSchema, id);
        res.status(result.status).json({ message: result.message, _id: id });
    } catch (error) {
        next(error);
    }
}

const getCourser = async (req, res, next) => {
    try {
        const data = await coursesSchema
            .find({})
            .sort({ order: -1 })
            .select('-module');

        res.status(StatusCodes.OK).json({
            totalItems: data.length,
            newData: data
        });
    } catch (error) {
        next(error);
    }
}

const outstandCourse = async (req, res, next) => {
    try {
        const { ids, limit } = req.body;
        const courses = await coursesSchema
            .find({
                price: { $gt: 0 },
                _id: { $nin: ids }
            })
            .sort({ star: -1 })
            .limit(limit)
            .select('-hidden -includes -benefit -customer -prerequisite -module -output');

        res.status(200).json(courses);
    } catch (error) {
        next(error);
    }
};

const freeCourse = async (req, res, next) => {
    try {
        const freeCourses = await coursesSchema.find({ price: 0 }).select('-module');
        res.status(200).json(freeCourses);
    } catch (error) {
        next(error);
    }
};

const allCourserCart = async (req, res, next) => {
    try {
        const { ids, idRemove } = req.body;
        if (!Array.isArray(ids)) {
            return res.status(400).json({ message: 'Lỗi: ID là một mảng' });
        }
        const courses = await coursesSchema.find({
            _id: { $in: ids, $nin: idRemove }
        }).select('_id name price sale slug img imgDetail star');
        res.status(200).json(courses);
    } catch (error) {
        next(error);
    }
}

const searchCourses = async (req, res, next) => {
    try {
        const { 'price-course': priceRange, 'category-course': categoryId } = req.query;
        const query = {};

        if (categoryId) {
            query.category = categoryId;
        }

        let results = await coursesSchema.find(query)
            .sort({ createdAt: -1 })
            .populate('category')
            .select('_id name price status title category slug sale img imgDetail star');

        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            results = results.filter(course => {
                const finalPrice = course.price - (course.price * course.sale / 100);
                return finalPrice >= minPrice && finalPrice <= maxPrice;
            });
        }

        res.status(200).json({ newData: results });
    } catch (error) {
        next(error);
    }
}

const addImageCourses = async (req, res, next) => {
    try {
        const { folder } = req.body;
        if (!folder) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Folder name is required' });
        }

        const file = req.file.path;
        const fileName = req.file.filename;
        const fileNameOutput = `compress-${fileName}`;

        if (!file) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Không có File được tải lên' });

        const folderPath = path.join(uploadDir, folder);
        if (!fs.existsSync(folderPath)) {
            await fs.promises.mkdir(folderPath, { recursive: true });
        }

        const outputPath = path.join(folderPath, fileNameOutput);
        const fileSize = req.file.size;
        if (fileSize > 1 * 1024 * 1024) {
            await sharp(fs.readFileSync(file))
                .toFormat('jpeg')
                .jpeg({ quality: 80 })
                .toFile(outputPath);
            await fs.promises.unlink(file);
            res.status(StatusCodes.OK).json(`course/${folder}/${fileNameOutput}`);
        } else {
            const newFilePath = path.join(folderPath, fileName);
            await fs.promises.rename(file, newFilePath);
            res.status(StatusCodes.OK).json(`course/${folder}/${fileName}`);
        }
    } catch (error) {
        next(error);
    }
}

const getModuleUser = async (req, res, next) => {
    try {
        const course = await coursesSchema.findById(req.params.id).select('module name').lean();
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        course.module.forEach((mod) => {
            mod.children.forEach((child) => {
                delete child.edit;
            });
        });
        res.status(200).json(course);
    } catch (error) {
        next(error);
    }
};

const getModule = async (req, res, next) => {
    try {
        const course = await coursesSchema.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course.module);
    } catch (error) {
        next(error);
    }
};

const addModule = async (req, res, next) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Tên học phần không được bỏ trống' });
        }

        const course = await coursesSchema.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const isModuleExists = course.module.some(mod => mod.title === title);
        if (isModuleExists) {
            return res.status(400).json({ message: 'Tên học phần đã tồn tại!' });
        }

        const newModule = {
            _id: new mongoose.Types.ObjectId(),
            title,
            key: new mongoose.Types.ObjectId(),
        };

        course.module.push(newModule);
        await course.save();
        res.status(201).json({ message: 'Thêm học phần mới thành công', newData: newModule });
    } catch (error) {
        next(error);
    }
};

const putModule = async (req, res, next) => {
    const { id } = req.params;
    const { moduleId, title, children } = req.body;

    try {
        const course = await coursesSchema.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Khóa học không tồn tại!' });
        }

        const module = course.module.id(moduleId);
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        const isModuleExists = course.module.some(mod => mod.title === title);
        if (isModuleExists) {
            return res.status(400).json({ message: 'Tên đã tồn tại' });
        }

        module.title = title || module.title;
        module.children = children || module.children;

        await course.save();
        res.status(200).json(module);
    } catch (error) {
        next(error);
    }
};

const delModule = async (req, res, next) => {
    try {
        const { id, moduleId } = req.params;

        const course = await coursesSchema.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const module = course.module.id(moduleId);
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        course.module.pull(moduleId);
        await course.save();
        res.status(200).json({ message: 'Xóa học phần thành công' });
    } catch (error) {
        next(error);
    }
};

const addModuleChildren = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { moduleId, title } = req.body;
        const course = await coursesSchema.findById(id);

        if (!course) {
            return res.status(404).json({ message: 'Course không tồn tại' });
        }

        if (!moduleId) {
            return res.status(400).json({ message: 'Module ID không được bỏ trống' });
        }

        const module = course.module.id(moduleId);
        if (!module) {
            return res.status(404).json({ message: 'Module không tồn tại' });
        }

        const titleExists = module.children.some(child => child.title === title);
        if (titleExists) {
            return res.status(400).json({ message: 'Tên học phần đã tồn tại!' });
        }

        const newModule = {
            _id: new mongoose.Types.ObjectId(),
            title: title,
            key: new mongoose.Types.ObjectId(),
        };

        module.children.push(newModule);
        await course.save();

        res.status(201).json({ message: 'Thêm bài học mới thành công', data: newModule });
    } catch (error) {
        next(error);
    }
};

const getModuleChildren = async (req, res, next) => {
    try {
        const { id, childId } = req.params;

        const course = await coursesSchema.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course không tồn tại' });
        }

        let childData = null;
        course.module.forEach(module => {
            const child = module.children.id(childId);
            if (child) {
                childData = child;
            }
        });

        if (!childData) {
            return res.status(404).json({ message: 'Child không tồn tại' });
        }

        res.status(200).json({ message: 'Lấy dữ liệu bài học thành công', data: childData });
    } catch (error) {
        next(error);
    }
};

const putModuleChildren = async (req, res, next) => {
    try {
        const { id, childId } = req.params;
        const updatedChild = req.body;
        const course = await coursesSchema.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course không tồn tại' });
        }
        let childFound = false;
        course.module.forEach(module => {
            const child = module.children.id(childId);
            if (child) {
                // Cập nhật thông tin cho children
                child.set(updatedChild);
                childFound = true; // Đánh dấu là đã tìm thấy child
            }
        });

        // Nếu không tìm thấy child, trả về lỗi
        if (!childFound) {
            return res.status(404).json({ message: 'Child không tồn tại' });
        }

        // Lưu khóa học sau khi cập nhật
        await course.save();

        res.status(200).json({ message: 'Cập nhật bài học thành công', data: updatedChild });
    } catch (error) {
        next(error);
    }
};

const delModuleChildren = async (req, res, next) => {
    try {
        const { id, childId } = req.params;
        const course = await coursesSchema.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course không tồn tại' });
        }

        let childFound = false;
        course.module.forEach(module => {
            const child = module.children.id(childId);
            if (child) {
                module.children.pull(childId); // Xóa child khỏi module
                childFound = true; // Đánh dấu là đã tìm thấy child
            }
        });

        if (!childFound) {
            return res.status(404).json({ message: 'Child không tồn tại' });
        }

        await course.save();
        res.status(200).json({ message: 'Xóa bài học thành công' });
    } catch (error) {
        next(error);
    }
};

const checkCourseUser = async (req, res, next) => {
    try {
        const { idUser, slugCourse } = req.body;
        const courseDetails = await coursesSchema.findOne({ slug: slugCourse }).select('price module name img');
        if (!courseDetails) {
            return res.status(404).json({ message: 'Khóa học không tồn tại' });
        }
        if (courseDetails.price === 0) {
            return res.status(200).json({
                message: 'Khóa học miễn phí, trả về modules',
                module: courseDetails.module,
                name: courseDetails.name,
                img: courseDetails.img
            });
        }

        const user = await userSchema.findById(idUser).populate('courses');
        if (!user) {
            return res.status(404).json({ message: 'User không tồn tại' });
        }
        const course = user.courses.find(c => c.slug === slugCourse);
        if (!course) {
            return res.status(400).json({ message: 'User chưa mua khóa học này' });
        }
        res.status(200).json({
            message: 'User đã mua khóa học',
            module: courseDetails.module,
            name: courseDetails.name,
            img: courseDetails.img
        });
    } catch (error) {
        next(error);
    }
}

export const courserController = {
    sigCourser,
    addCourser,
    getCourser,
    sigAdmin,
    putCourser,
    putOrder,
    delCourser,
    allCourserCart,
    outstandCourse,
    addImageCourses,
    updateCourseModule,
    checkCourseUser,
    freeCourse
}

export const courseAdminController = {
    getModuleUser,
    getModule,
    addModule,
    putModule,
    delModule,
    getModuleChildren,
    addModuleChildren,
    putModuleChildren,
    delModuleChildren
}

export const searchCourserController = {
    searchCourses
}