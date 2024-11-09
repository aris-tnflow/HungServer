import mongoose from 'mongoose';
import { env } from '../utils/dotenv.js';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.MONGODB_URI);
        console.log(`MongoDB: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;