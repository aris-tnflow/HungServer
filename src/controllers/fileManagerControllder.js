import { StatusCodes } from 'http-status-codes';
import dirTree from 'directory-tree';
import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import archiver from 'archiver';

import pageSchema from "~/models/pagesModel.js";
import masonrySchema from "~/models/masonryModel";
import layoutSchema from "~/models/layoutModel";
import coursesSchema from '~/models/coursesModel';

const allFile = async (req, res, next) => {
    try {
        const tree = dirTree(path.join(__dirname, '../public/uploads',), { attributes: ['type', 'size', 'extension'] });
        res.status(StatusCodes.OK).json(tree);
    } catch (error) {
        next(error);
    }
}

const getAllImages = async (req, res, next) => {
    try {
        const tree = dirTree(path.join(__dirname, '../public/uploads'), {
            attributes: ['type', 'size', 'extension']
        });

        const filterImages = (node) => {
            if (node.type === 'directory') {
                return node.children.flatMap(filterImages);
            } else {
                const mimeType = mime.lookup(node.name);
                if (mimeType && mimeType.startsWith('image/')) {
                    return [{
                        path: node.path.replace(/\\/g, '/').replace(path.join(__dirname, '../public/').replace(/\\/g, '/'), '/'),
                        name: node.name,
                        mimeType,
                        size: node.size,
                        extension: node.extension
                    }];
                }
                return [];
            }
        };

        // Get all images from the tree
        const images = filterImages(tree);

        // Respond with the images
        res.status(StatusCodes.OK).json(images);
    } catch (error) {
        next(error);
    }
};

const filterFileType = async (req, res, next) => {
    try {
        const { fileTypes } = req.body;
        if (!fileTypes || !Array.isArray(fileTypes) || fileTypes.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'fileTypes is required and should be a non-empty array.' });
        }

        const tree = dirTree(path.join(__dirname, '../public/uploads'), {
            extensions: new RegExp(`\\.(${fileTypes.join('|')})$`),
            attributes: ['type', 'size', 'extension']
        });

        res.status(StatusCodes.OK).json(tree);
    } catch (error) {
        next(error);
    }
};

const filesInFolder = async (req, res, next) => {
    try {
        const { folderName } = req.body;
        if (!folderName) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'FolderName is required.' });
        }

        const folderPath = path.join(__dirname, '../public/', folderName);
        const tree = dirTree(folderPath, {
            attributes: ['type', 'size', 'extension'],
        });

        if (!tree || tree.type !== 'directory') {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Folder not found or it is not a directory.' });
        }

        const formatPath = (filePath) => {
            return filePath
                .replace(/\\/g, '/')
                .replace(`${path.join(__dirname, '../public/').replace(/\\/g, '/')}`, `/`);
        };

        const checkFileExistence = async (fileName) => {
            const regexPattern = new RegExp(fileName, 'i');

            const [pageExists, masonryExists, layoutExists, coursesExists] = await Promise.all([
                pageSchema.findOne({
                    $or: [
                        { 'content.html': regexPattern },
                        { 'content.css': regexPattern },
                        { 'content.js': regexPattern }
                    ]
                }).exec(),

                masonrySchema.findOne({
                    $or: [
                        { 'img.imgSrc': regexPattern },
                        { 'img.link': regexPattern }
                    ]
                }).exec(),

                layoutSchema.findOne({
                    $or: [
                        { 'header': regexPattern },
                        { 'footer': regexPattern },
                        { 'css': regexPattern }
                    ]
                }).exec(),

                coursesSchema.findOne({
                    $or: [
                        { 'img': regexPattern },
                        { 'imgDetail': regexPattern },
                        { 'module.children.src': regexPattern },
                        { 'module.children.content.html': regexPattern },
                        { 'module.children.content.css': regexPattern },
                        { 'module.children.content.js': regexPattern }
                    ]
                }).exec()
            ]);

            return !!(pageExists || masonryExists || layoutExists || coursesExists);
        };

        const formatTree = async (node) => {
            if (node.type === 'directory') {
                const formattedChildren = await Promise.all(
                    node.children.map(async (child) => {
                        if (child.type === 'directory') {
                            return {
                                ...child,
                                _id: child.name,
                                path: formatPath(child.path),
                                children: child.children
                            };
                        } else {
                            // Chỉ kiểm tra các file ở bậc đầu tiên
                            const exists = await checkFileExistence(child.name);
                            return {
                                ...child,
                                _id: formatPath(child.path),
                                path: formatPath(child.path),
                                mimeType: mime.lookup(child.name) || 'application/octet-stream',
                                exists
                            };
                        }
                    })
                );

                return {
                    ...node,
                    path: formatPath(node.path),
                    children: formattedChildren
                };
            } else {
                const exists = await checkFileExistence(node.name);
                return {
                    ...node,
                    path: formatPath(node.path),
                    mimeType: mime.lookup(node.name) || 'application/octet-stream',
                    exists
                };
            }
        };

        const formattedTree = await formatTree(tree);
        res.status(StatusCodes.OK).json({ newData: formattedTree });
    } catch (error) {
        next(error);
    }
};

const delFile = async (req, res, next) => {
    try {
        const { filePath } = req.body;
        if (!filePath) {
            return res.status(400).json({ error: 'File path is required' });
        }
        const fullPath = path.join(__dirname, '../public', filePath);
        fs.unlink(fullPath, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete file', details: err.message });
            }
            res.status(200).json({ message: 'File deleted successfully', _id: filePath });
        });
    } catch (error) {
        next(error);
    }
}

export const fileManagerController = {
    allFile,
    delFile,
    getAllImages,
    filterFileType,
    filesInFolder,
}

const getFolder = async (req, res, next) => {
    try {
        const folderPath = path.join(__dirname, '../public/uploads');
        let tree = dirTree(folderPath, {
            exclude: /\.(?!$)/,
        });

        const sortTree = (node) => {
            if (node.children && node.children.length > 0) {
                node.children.sort((a, b) => a.name.localeCompare(b.name));
                node.children.forEach(sortTree);
            }
        };
        const renameTreeKeys = (node) => {
            node.title = node.name;
            node.key = node.path;
            delete node.name;

            if (node.children && node.children.length > 0) {
                node.children.forEach(renameTreeKeys);
            }
        };
        sortTree(tree);
        renameTreeKeys(tree);
        res.status(StatusCodes.OK).json({ newData: tree });
    } catch (error) {
        next(error);
    }
};

const addFolder = async (req, res, next) => {
    try {
        const { name, parentPath } = req.body;
        if (!name || !parentPath) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Name and parentPath are required.' });
        }

        if (typeof name !== 'string' || typeof parentPath !== 'string') {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Name and parentPath must be strings.' });
        }

        const folderPath = path.join(__dirname, '../public/', parentPath, name);

        if (fs.existsSync(folderPath)) {
            return res.status(StatusCodes.CONFLICT).json({ error: 'Folder already exists.' });
        }

        fs.mkdirSync(folderPath, { recursive: true });

        res.status(StatusCodes.CREATED).json({
            message: 'Folder created successfully.', newData: {
                children: [],
                name: name,
                path: `${parentPath}/${name}`,
                size: 0,
                type: 'directory'
            }
        });
    } catch (error) {
        next(error);
    }
};

const putFolder = async (req, res, next) => {
    try {
        const { oldName, newName, parentPath } = req.body;
        if (!oldName || !newName || !parentPath) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'oldName, newName, and parentPath are required.' });
        }

        const oldFolderPath = path.join(__dirname, '../public/', parentPath, oldName);
        const newFolderPath = path.join(__dirname, '../public/', parentPath, newName);

        if (!fs.existsSync(oldFolderPath)) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'The old folder does not exist.' });
        }

        if (fs.existsSync(newFolderPath)) {
            return res.status(StatusCodes.CONFLICT).json({ error: 'The new folder name already exists.' });
        }

        fs.renameSync(oldFolderPath, newFolderPath);

        res.status(StatusCodes.OK).json({ message: 'Folder renamed successfully.', path: newFolderPath });
    } catch (error) {
        next(error);
    }
};

const delFolder = async (req, res, next) => {
    try {
        const { namefolder, parentPath } = req.body;
        if (!namefolder || !parentPath) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Name and parentPath are required.' });
        }

        const folderPath = path.join(__dirname, '../public/', parentPath, namefolder);

        if (!fs.existsSync(folderPath)) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Folder not found.' });
        }

        fs.rmdirSync(folderPath, { recursive: true });

        res.status(StatusCodes.OK).json({ message: 'Folder deleted successfully.', _id: namefolder });
    } catch (error) {
        next(error);
    }
};

const dowFolder = async (req, res, next) => {
    try {
        const { folderPath } = req.body;

        if (!folderPath) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Folder path is required.' });
        }

        const fullPath = path.join(__dirname, '../public', folderPath);

        if (!fs.existsSync(fullPath)) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Folder does not exist.' });
        }

        const zipFileName = path.basename(folderPath) + '.zip';
        const output = path.join(__dirname, '../public/', zipFileName);

        const archive = archiver('zip', { zlib: { level: 9 } });
        const outputStream = fs.createWriteStream(output);

        // Bắt lỗi
        archive.on('error', (err) => {
            throw err;
        });

        // Khi file zip đã sẵn sàng
        outputStream.on('close', () => {
            res.status(StatusCodes.OK).download(output);
        });

        // Bắt đầu nén thư mục
        archive.pipe(outputStream);
        archive.directory(fullPath, false);
        archive.finalize();
    } catch (error) {
        next(error);
    }
};

export const folderManagerController = {
    getFolder,
    addFolder,
    putFolder,
    delFolder,
    dowFolder,
}
