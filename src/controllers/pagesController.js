import pageSchema from "~/models/pagesModel.js";
import masonrySchema from "~/models/masonryModel";
import layoutSchema from "~/models/layoutModel";
import coursesSchema from "~/models/coursesModel";
import emailSchema from "~/models/emailModel";
import groupSchema from "~/models/groupModel";

import { addData, updateData, deleteData, getSigData } from "./indexControllder";
import { StatusCodes } from "http-status-codes";

const nameMess = 'Bài viết';

const sigPage = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const results = await getSigData(nameMess, { slug: slug }, pageSchema, { populate: 'group', select: '_id name title description title keywords content slug group' });
        res.status(results.status).json(results.message);
    } catch (error) {
        next(error);
    }
}

const sigPageEdit = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const results = await getSigData(nameMess, { slug: slug }, pageSchema, { select: '_id name slug edit' });
        res.status(results.status).json(results.message);
    } catch (error) {
        next(error);
    }
}

const allPage = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const totalItems = await pageSchema.countDocuments();
        const data = await pageSchema
            .find({})
            .sort({ order: -1 })
            .skip(skip)
            .limit(Number(limit))
            .select('-content -edit')
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

const allGroupPage = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { group } = req.params;
        const skip = (page - 1) * limit;

        const groupObj = await groupSchema.findOne({ slug: group });
        if (!groupObj) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Group not found' });
        }
        const totalItems = await pageSchema.countDocuments({ group: groupObj._id });
        const data = await pageSchema
            .find({ group: groupObj._id })
            .sort({ order: -1 })
            .populate('group')
            .skip(skip)
            .limit(Number(limit))
            .select('-content -edit');

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

const searchPage = async (req, res, next) => {
    try {
        const { page = 1, limit = 50, ...filters } = req.query;
        const searchCondition = {};
        Object.keys(filters).forEach(key => {
            if (key !== 'page' && key !== 'limit') {
                searchCondition[key] = { $regex: filters[key], $options: 'i' };
            }
        });
        if (Object.keys(searchCondition).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Vui lòng cung cấp điều kiện tìm kiếm.' });
        }
        const skip = (page - 1) * limit;
        const totalItems = await pageSchema.countDocuments(searchCondition);
        const data = await pageSchema
            .find(searchCondition)
            .sort({ order: -1 })
            .skip(skip)
            .limit(Number(limit))
            .select('-content -edit');
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

const addPage = async (req, res, next) => {
    try {
        const result = await addData(nameMess, pageSchema, req.body, { uniqueField: 'name', customSlugField: 'name' });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const putPage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateData(nameMess, pageSchema, id, req.body, { uniqueField: 'name' });
        res.status(result.status).json({ message: result.message, newData: result.data });
    } catch (error) {
        next(error);
    }
}

const putOrder = async (req, res, next) => {
    try {
        const pagesOrder = req.body;
        const updatedPages = [];

        for (const page of pagesOrder) {
            const updatedPage = await pageSchema.findByIdAndUpdate(page._id, { order: page.order }, { new: true }).select('-content -edit');
            updatedPages.push(updatedPage);
        }
        res.status(200).json({ message: 'Order fields updated successfully', newData: updatedPages });
    } catch (error) {
        next(error);
    }
};

const copyPage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const originalPage = await pageSchema.findById(id);

        if (!originalPage) {
            return res.status(404).json({ message: 'Trang không tồn tại.' });
        }
        const newPageData = {
            ...originalPage.toObject(),
            name: `${originalPage.name} - Copy`,
            slug: `${originalPage.slug}-copy`,
        };
        delete newPageData._id;

        const result = await addData(nameMess, pageSchema, newPageData, { uniqueField: 'name', customSlugField: 'name' });
        res.status(result.status).json({ message: 'Trang đã được sao chép thành công.', newData: result.data });
    } catch (error) {
        next(error);
    }
}

const delPage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteData(nameMess, pageSchema, id);
        res.status(result.status).json({ message: result.message, _id: id });
    } catch (error) {
        next(error);
    }
}

const replaceInObject = (obj, oldBaseUrl, newBaseUrl) => {
    if (typeof obj === 'string') {
        return obj.replace(new RegExp(oldBaseUrl, 'gi'), newBaseUrl);
    } else if (Array.isArray(obj)) {
        return obj.map(item => replaceInObject(item, oldBaseUrl, newBaseUrl));
    } else if (typeof obj === 'object') {
        const updatedObject = {};
        for (const [key, value] of Object.entries(obj)) {
            updatedObject[key] = replaceInObject(value, oldBaseUrl, newBaseUrl);
        }
        return updatedObject;
    }
    return obj;
};

// const changeText = async (req, res, next) => {
//     const { oldDomain, newDomain } = req.body;

//     if (!oldDomain || !newDomain) {
//         return res.status(400).json({ error: 'Vui lòng cung cấp cả oldDomain và newDomain' });
//     }

//     try {
//         const updatePageResult = await pageSchema.updateMany(
//             {
//                 $or: [
//                     { 'content.html': { $regex: oldDomain, $options: 'i' } },
//                     { 'content.css': { $regex: oldDomain, $options: 'i' } },
//                     { 'content.js': { $regex: oldDomain, $options: 'i' } }
//                 ]
//             },
//             [
//                 {
//                     $set: {
//                         'content.html': {
//                             $replaceAll: {
//                                 input: '$content.html',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'content.css': {
//                             $replaceAll: {
//                                 input: '$content.css',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'content.js': {
//                             $replaceAll: {
//                                 input: '$content.js',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const pages = await pageSchema.find({ 'edit': { $type: 'object' } });
//         let updatedPagesCount = 0;

//         for (const page of pages) {
//             if (page.edit) {
//                 const editString = JSON.stringify(page.edit);
//                 if (editString.includes(oldDomain)) {
//                     const updatedEditString = editString.replace(new RegExp(oldDomain, 'g'), newDomain);
//                     page.edit = JSON.parse(updatedEditString);
//                     await page.save();
//                     updatedPagesCount++;
//                 }
//             }
//         }

//         const updateMasonryResult = await masonrySchema.updateMany(
//             { 'img.imgSrc': { $regex: oldDomain, $options: 'i' } },
//             [
//                 {
//                     $set: {
//                         'img': {
//                             $map: {
//                                 input: '$img',
//                                 as: 'image',
//                                 in: {
//                                     $mergeObjects: [
//                                         '$$image',
//                                         {
//                                             imgSrc: {
//                                                 $replaceAll: {
//                                                     input: '$$image.imgSrc',
//                                                     find: oldDomain,
//                                                     replacement: newDomain
//                                                 }
//                                             },
//                                             link: {
//                                                 $replaceAll: {
//                                                     input: '$$image.link',
//                                                     find: oldDomain,
//                                                     replacement: newDomain
//                                                 }
//                                             }
//                                         }
//                                     ]
//                                 }
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const totalUpdated = updatePageResult.modifiedCount + updatedPagesCount + updateMasonryResult.modifiedCount;

//         res.json({
//             message: 'Cập nhật thành công',

//         });

//     } catch (error) {
//         next(error);
//     }
// };

// const changeText = async (req, res, next) => {
//     const { oldDomain, newDomain } = req.body;

//     if (!oldDomain || !newDomain) {
//         return res.status(400).json({ error: 'Vui lòng cung cấp cả oldDomain và newDomain' });
//     }

//     try {
//         const updatePageResult = await pageSchema.updateMany(
//             {
//                 $or: [
//                     { 'content.html': { $regex: oldDomain, $options: 'i' } },
//                     { 'content.css': { $regex: oldDomain, $options: 'i' } },
//                     { 'content.js': { $regex: oldDomain, $options: 'i' } }
//                 ]
//             },
//             [
//                 {
//                     $set: {
//                         'content.html': {
//                             $replaceAll: {
//                                 input: '$content.html',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'content.css': {
//                             $replaceAll: {
//                                 input: '$content.css',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'content.js': {
//                             $replaceAll: {
//                                 input: '$content.js',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const pages = await pageSchema.find({ 'edit': { $type: 'object' } });
//         let updatedPagesCount = 0;
//         for (const page of pages) {
//             if (page.edit) {
//                 const editString = JSON.stringify(page.edit);
//                 if (editString.includes(oldDomain)) {
//                     const updatedEditString = editString.replace(new RegExp(oldDomain, 'g'), newDomain);
//                     page.edit = JSON.parse(updatedEditString);
//                     await page.save();
//                     updatedPagesCount++;
//                 }
//             }
//         }

//         const updateMasonryResult = await masonrySchema.updateMany(
//             { 'img.imgSrc': { $regex: oldDomain, $options: 'i' } },
//             [
//                 {
//                     $set: {
//                         'img': {
//                             $map: {
//                                 input: '$img',
//                                 as: 'image',
//                                 in: {
//                                     $mergeObjects: [
//                                         '$$image',
//                                         {
//                                             imgSrc: {
//                                                 $replaceAll: {
//                                                     input: '$$image.imgSrc',
//                                                     find: oldDomain,
//                                                     replacement: newDomain
//                                                 }
//                                             },
//                                             link: {
//                                                 $replaceAll: {
//                                                     input: '$$image.link',
//                                                     find: oldDomain,
//                                                     replacement: newDomain
//                                                 }
//                                             }
//                                         }
//                                     ]
//                                 }
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const updateLayoutResult = await layoutSchema.updateMany(
//             {
//                 $or: [
//                     { 'header': { $regex: oldDomain, $options: 'i' } },
//                     { 'footer': { $regex: oldDomain, $options: 'i' } },
//                     { 'css': { $regex: oldDomain, $options: 'i' } }
//                 ]
//             },
//             [
//                 {
//                     $set: {
//                         'header': {
//                             $replaceAll: {
//                                 input: '$header',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'footer': {
//                             $replaceAll: {
//                                 input: '$footer',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'css': {
//                             $replaceAll: {
//                                 input: '$css',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const updateCoursesResult = await coursesSchema.updateMany(
//             { 'module.children.content.html': { $regex: oldDomain, $options: 'i' } },
//             [
//                 {
//                     $set: {
//                         'module': {
//                             $map: {
//                                 input: '$module',
//                                 as: 'moduleItem',
//                                 in: {
//                                     $mergeObjects: [
//                                         '$$moduleItem',
//                                         {
//                                             children: {
//                                                 $map: {
//                                                     input: '$$moduleItem.children',
//                                                     as: 'child',
//                                                     in: {
//                                                         $mergeObjects: [
//                                                             '$$child',
//                                                             {
//                                                                 'content.html': {
//                                                                     $replaceAll: {
//                                                                         input: '$$child.content.html',
//                                                                         find: oldDomain,
//                                                                         replacement: newDomain
//                                                                     }
//                                                                 },
//                                                                 'content.css': {
//                                                                     $replaceAll: {
//                                                                         input: '$$child.content.css',
//                                                                         find: oldDomain,
//                                                                         replacement: newDomain
//                                                                     }
//                                                                 },
//                                                                 'content.js': {
//                                                                     $replaceAll: {
//                                                                         input: '$$child.content.js',
//                                                                         find: oldDomain,
//                                                                         replacement: newDomain
//                                                                     }
//                                                                 },
//                                                                 'src': {
//                                                                     $replaceAll: {
//                                                                         input: '$$child.src',
//                                                                         find: oldDomain,
//                                                                         replacement: newDomain
//                                                                     }
//                                                                 },
//                                                                 'poster': {
//                                                                     $replaceAll: {
//                                                                         input: '$$child.poster',
//                                                                         find: oldDomain,
//                                                                         replacement: newDomain
//                                                                     }
//                                                                 },
//                                                                 'thumbnailTracks': {
//                                                                     $replaceAll: {
//                                                                         input: '$$child.thumbnailTracks',
//                                                                         find: oldDomain,
//                                                                         replacement: newDomain
//                                                                     }
//                                                                 },
//                                                                 'textTracks': {
//                                                                     $map: {
//                                                                         input: '$$child.textTracks',
//                                                                         as: 'track',
//                                                                         in: {
//                                                                             $mergeObjects: [
//                                                                                 '$$track',
//                                                                                 {
//                                                                                     'src': {
//                                                                                         $replaceAll: {
//                                                                                             input: '$$track.src',
//                                                                                             find: oldDomain,
//                                                                                             replacement: newDomain
//                                                                                         }
//                                                                                     }
//                                                                                 }
//                                                                             ]
//                                                                         }
//                                                                     }
//                                                                 }
//                                                             }
//                                                         ]
//                                                     }
//                                                 }
//                                             }
//                                         }
//                                     ]
//                                 }
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const layouts = await layoutSchema.find({ 'edit': { $type: 'object' } });
//         let updatedLayoutsCount = 0;
//         for (const layout of layouts) {
//             if (layout.edit) {
//                 const editString = JSON.stringify(layout.edit);
//                 if (editString.includes(oldDomain)) {
//                     const updatedEditString = editString.replace(new RegExp(oldDomain, 'g'), newDomain);
//                     layout.edit = JSON.parse(updatedEditString);
//                     await layout.save();
//                     updatedLayoutsCount++;
//                 }
//             }
//         }

//         const totalUpdated = updateCoursesResult + updatePageResult.modifiedCount + updatedPagesCount + updateMasonryResult.modifiedCount + updateLayoutResult.modifiedCount + updatedLayoutsCount;

//         res.json({
//             message: 'Cập nhật thành công',
//             totalUpdated
//         });

//     } catch (error) {
//         next(error);
//     }
// };


// const changeText = async (req, res, next) => {
//     const { oldDomain, newDomain } = req.body;

//     if (!oldDomain || !newDomain) {
//         return res.status(400).json({ error: 'Vui lòng cung cấp cả oldDomain và newDomain' });
//     }

//     try {
//         const updatePageResult = await pageSchema.updateMany(
//             {
//                 $or: [
//                     { 'content.html': { $regex: oldDomain, $options: 'i' } },
//                     { 'content.css': { $regex: oldDomain, $options: 'i' } },
//                     { 'content.js': { $regex: oldDomain, $options: 'i' } }
//                 ]
//             },
//             [
//                 {
//                     $set: {
//                         'content.html': {
//                             $replaceAll: {
//                                 input: '$content.html',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'content.css': {
//                             $replaceAll: {
//                                 input: '$content.css',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'content.js': {
//                             $replaceAll: {
//                                 input: '$content.js',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         // Xử lý cập nhật cho Courses - module - children content.html
//         const courses = await coursesSchema.find();
//         let updatedCoursesCount = 0;

//         for (const course of courses) {
//             let courseUpdated = false;

//             course.module.forEach(module => {
//                 module.children.forEach(child => {
//                     if (child.content && child.content.html && child.content.html.includes(oldDomain)) {
//                         child.content.html = child.content.html.replace(new RegExp(oldDomain, 'g'), newDomain);
//                         courseUpdated = true;
//                     }
//                 });
//             });

//             if (courseUpdated) {
//                 await course.save();
//                 updatedCoursesCount++;
//             }
//         }

//         const updateMasonryResult = await masonrySchema.updateMany(
//             { 'img.imgSrc': { $regex: oldDomain, $options: 'i' } },
//             [
//                 {
//                     $set: {
//                         'img': {
//                             $map: {
//                                 input: '$img',
//                                 as: 'image',
//                                 in: {
//                                     $mergeObjects: [
//                                         '$$image',
//                                         {
//                                             imgSrc: {
//                                                 $replaceAll: {
//                                                     input: '$$image.imgSrc',
//                                                     find: oldDomain,
//                                                     replacement: newDomain
//                                                 }
//                                             },
//                                             link: {
//                                                 $replaceAll: {
//                                                     input: '$$image.link',
//                                                     find: oldDomain,
//                                                     replacement: newDomain
//                                                 }
//                                             }
//                                         }
//                                     ]
//                                 }
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const updateLayoutResult = await layoutSchema.updateMany(
//             {
//                 $or: [
//                     { 'header': { $regex: oldDomain, $options: 'i' } },
//                     { 'footer': { $regex: oldDomain, $options: 'i' } },
//                     { 'css': { $regex: oldDomain, $options: 'i' } }
//                 ]
//             },
//             [
//                 {
//                     $set: {
//                         'header': {
//                             $replaceAll: {
//                                 input: '$header',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'footer': {
//                             $replaceAll: {
//                                 input: '$footer',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         },
//                         'css': {
//                             $replaceAll: {
//                                 input: '$css',
//                                 find: oldDomain,
//                                 replacement: newDomain
//                             }
//                         }
//                     }
//                 }
//             ]
//         );

//         const totalUpdated = updatePageResult.modifiedCount + updateMasonryResult.modifiedCount + updateLayoutResult.modifiedCount + updatedCoursesCount;

//         res.json({
//             message: 'Cập nhật thành công',
//             totalUpdated
//         });

//     } catch (error) {
//         next(error);
//     }
// };

const changeText = async (req, res, next) => {
    const { oldDomain, newDomain } = req.body;

    if (!oldDomain || !newDomain) {
        return res.status(400).json({ error: 'Vui lòng cung cấp cả oldDomain và newDomain' });
    }

    try {
        const updatePageResult = await pageSchema.updateMany(
            {
                $or: [
                    { 'content.html': { $regex: oldDomain, $options: 'i' } },
                    { 'content.css': { $regex: oldDomain, $options: 'i' } },
                    { 'content.js': { $regex: oldDomain, $options: 'i' } }
                ]
            },
            [
                {
                    $set: {
                        'content.html': {
                            $replaceAll: {
                                input: '$content.html',
                                find: oldDomain,
                                replacement: newDomain
                            }
                        },
                        'content.css': {
                            $replaceAll: {
                                input: '$content.css',
                                find: oldDomain,
                                replacement: newDomain
                            }
                        },
                        'content.js': {
                            $replaceAll: {
                                input: '$content.js',
                                find: oldDomain,
                                replacement: newDomain
                            }
                        }
                    }
                }
            ]
        );

        // Cập nhật trong Courses
        const courses = await coursesSchema.find();
        let updatedCoursesCount = 0;

        for (const course of courses) {
            let courseUpdated = false;

            course.module.forEach(module => {
                module.children.forEach(child => {
                    if (child.content && child.content.html && child.content.html.includes(oldDomain)) {
                        child.content.html = child.content.html.replace(new RegExp(oldDomain, 'g'), newDomain);
                        courseUpdated = true;
                    }
                });
            });

            if (courseUpdated) {
                await course.save();
                updatedCoursesCount++;
            }
        }

        // Cập nhật trong Masonry
        const updateMasonryResult = await masonrySchema.updateMany(
            { 'img.imgSrc': { $regex: oldDomain, $options: 'i' } },
            [
                {
                    $set: {
                        'img': {
                            $map: {
                                input: '$img',
                                as: 'image',
                                in: {
                                    $mergeObjects: [
                                        '$$image',
                                        {
                                            imgSrc: {
                                                $replaceAll: {
                                                    input: '$$image.imgSrc',
                                                    find: oldDomain,
                                                    replacement: newDomain
                                                }
                                            },
                                            link: {
                                                $replaceAll: {
                                                    input: '$$image.link',
                                                    find: oldDomain,
                                                    replacement: newDomain
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            ]
        );

        // Cập nhật trong Layout
        const updateLayoutResult = await layoutSchema.updateMany(
            {
                $or: [
                    { 'header': { $regex: oldDomain, $options: 'i' } },
                    { 'footer': { $regex: oldDomain, $options: 'i' } },
                    { 'css': { $regex: oldDomain, $options: 'i' } }
                ]
            },
            [
                {
                    $set: {
                        'header': {
                            $replaceAll: {
                                input: '$header',
                                find: oldDomain,
                                replacement: newDomain
                            }
                        },
                        'footer': {
                            $replaceAll: {
                                input: '$footer',
                                find: oldDomain,
                                replacement: newDomain
                            }
                        },
                        'css': {
                            $replaceAll: {
                                input: '$css',
                                find: oldDomain,
                                replacement: newDomain
                            }
                        }
                    }
                }
            ]
        );

        // Cập nhật trong Emails
        const updateEmailResult = await emailSchema.updateMany(
            { 'content.html': { $regex: oldDomain, $options: 'i' } },
            [
                {
                    $set: {
                        'content.html': {
                            $replaceAll: {
                                input: '$content.html',
                                find: oldDomain,
                                replacement: newDomain
                            }
                        }
                    }
                }
            ]
        );

        const totalUpdated = updatePageResult.modifiedCount +
            updateMasonryResult.modifiedCount +
            updateLayoutResult.modifiedCount +
            updateEmailResult.modifiedCount +
            updatedCoursesCount;

        res.json({
            message: 'Cập Nhật Thành Công',
            totalUpdated
        });

    } catch (error) {
        next(error);
    }
};

export const pagesController = {
    putOrder,
    sigPageEdit,
    sigPage,
    addPage,
    allPage,
    putPage,
    delPage,
    copyPage,
    changeText,
    searchPage,
    allGroupPage
}