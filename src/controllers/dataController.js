import { StatusCodes } from 'http-status-codes';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { MongoClient } from 'mongodb';
import { env } from '~/utils/dotenv';
import cron from 'node-cron';
import setting from '../json/setting.json'

const backup = async (req, res, next) => {
    async function listCollections(dbName) {
        const client = new MongoClient(env.MONGODB_URI);
        try {
            await client.connect();
            const db = client.db(dbName);
            const collections = await db.listCollections().toArray();
            return collections.map(col => col.name);
        } finally {
            await client.close();
        }
    }

    function backupCollection(dbName, collection, archivePath) {
        return new Promise((resolve, reject) => {
            const child = spawn('mongodump', [
                `--db=${dbName}`,
                `--collection=${collection}`,
                `--uri=${env.MONGODB_URI}`,
                `--archive=${archivePath}`,
                '--gzip',
            ]);

            child.stdout.on('data', (data) => {
                console.log('stdout:\n', data.toString());
            });

            child.stderr.on('data', (data) => {
                console.log('stderr:\n', data.toString());
            });

            child.on('error', (error) => {
                console.error('Error during backup process:', error);
                reject(error);
            });

            child.on('exit', (code, signal) => {
                if (code) {
                    console.error('Process exit with code:', code);
                    reject(new Error(`Backup process exited with code: ${code}`));
                } else if (signal) {
                    console.error('Process killed with signal:', signal);
                    reject(new Error(`Backup process killed with signal: ${signal}`));
                } else {
                    console.log(`Backup is successful for collection ${collection} ✅`);
                    resolve();
                }
            });
        });
    }

    try {
        const DB_NAME = 'test';

        const now = new Date();
        const timestamp = now.toISOString().replace(/:/g, '-').split('.')[0];

        const BACKUP_DIR = path.join(__dirname, `../public/uploads/backup/${timestamp}`);
        if (!fs.existsSync(BACKUP_DIR)) {
            fs.mkdirSync(BACKUP_DIR, { recursive: true });
        }

        const collections = await listCollections(DB_NAME);
        for (const collection of collections) {
            const ARCHIVE_PATH = path.join(BACKUP_DIR, `${collection}.gzip`);
            console.log(`Backing up collection ${collection} to ${ARCHIVE_PATH}`);

            await backupCollection(DB_NAME, collection, ARCHIVE_PATH);
        }
        res.status(StatusCodes.OK).json({ message: 'Backup process completed for all collections ✅' });
    } catch (error) {
        next(error);
    }
};

const restore = async (req, res, next) => {
    function restoreCollection(dbName, collection, archivePath) {
        return new Promise((resolve, reject) => {
            const child = spawn('mongorestore', [
                `--db=${dbName}`,
                `--collection=${collection}`,
                `--uri=${env.MONGODB_URI}`,
                `--archive=${archivePath}`,
                '--gzip',
                '--drop',
            ]);

            child.stdout.on('data', (data) => {
                console.log('stdout:\n', data.toString());
            });

            child.stderr.on('data', (data) => {
                console.log('stderr:\n', data.toString());
            });

            child.on('error', (error) => {
                console.error('Error during restore process:', error);
                reject(error);
            });

            child.on('exit', (code, signal) => {
                if (code) {
                    console.error('Process exit with code:', code);
                    reject(new Error(`Restore process exited with code: ${code}`));
                } else if (signal) {
                    console.error('Process killed with signal:', signal);
                    reject(new Error(`Restore process killed with signal: ${signal}`));
                } else {
                    console.log(`Restore is successful for collection ${collection} ✅`);
                    resolve();
                }
            });
        });
    }

    try {
        const DB_NAME = 'test';
        const { collections } = req.body;

        if (typeof collections !== 'object' || Object.keys(collections).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Invalid or empty collections object provided',
            });
        }

        for (const [collection, folder] of Object.entries(collections)) {
            const ARCHIVE_PATH = path.join(__dirname, `../public/uploads/backup/${folder}`, `${collection}.gzip`);

            if (!fs.existsSync(ARCHIVE_PATH)) {
                console.warn(`Backup file for collection ${collection} in folder ${folder} does not exist. Skipping.`);
                continue;
            }

            console.log(`Restoring collection ${collection} from ${ARCHIVE_PATH}`);
            await restoreCollection(DB_NAME, collection, ARCHIVE_PATH);
        }

        res.status(StatusCodes.OK).json({ message: 'Restore process completed for specified collections ✅' });
    } catch (error) {
        console.error('Error during restore operation:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Restore process failed ❌',
            error: error.message,
        });
    }
};

const dataMedia = async (req, res, next) => {
    try {
        const calculateDirectorySize = (directoryPath) => {
            let totalSize = 0;

            const files = fs.readdirSync(directoryPath);
            files.forEach(file => {
                const filePath = path.join(directoryPath, file);
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    totalSize += calculateDirectorySize(filePath);
                } else {
                    totalSize += stat.size;
                }
            });

            return totalSize;
        };
        const publicDirPath = path.join(__dirname, '../public');
        const totalSize = calculateDirectorySize(publicDirPath);
        res.status(StatusCodes.OK).json({
            totalSize: totalSize,
        });
    } catch (err) {
        next(err);
    }
};

const getDataUsage = async (req, res, next) => {
    const client = new MongoClient(env.MONGODB_URI);
    const dbName = 'test';
    try {
        await client.connect();
        const db = client.db(dbName);
        const stats = await db.command({ dbStats: 1 });
        const totalSizeInMB = (stats.dataSize / (1024 * 1024)).toFixed(2);
        res.status(StatusCodes.OK).json(totalSizeInMB);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sử dụng:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Không thể lấy dung lượng dữ liệu đã sử dụng',
            error: error.message,
        });
    } finally {
        await client.close();
    }
};

const { time } = setting["restore-backup"];
cron.schedule(time, async () => {
    try {
        const req = {};
        const res = { status: () => ({ json: console.log }) };
        await backup(req, res, () => { });
    } catch (error) {
        console.error('Lỗi khi thực hiện backup tự động:', error);
    }
}, {
    timezone: 'Asia/Ho_Chi_Minh'
});

export const dataController = {
    backup,
    restore,
    dataMedia,
    getDataUsage
};
