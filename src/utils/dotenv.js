import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const JWT = process.env.JWT;
const SECRETKEY = process.env.SECRETKEY;
const PORT = process.env.PORT || 5000;
const URL_API = process.env.URL_API || "http://localhost:8082";
const URL_CLIENT = process.env.URL_CLIENT || "http://localhost:5173";
const EMAIL_USER = process.env.EMAIL_USER || "admin@chickenwar.vn";
const EMAIL_PASS = process.env.EMAIL_PASS || "brct txis vhij pvph";

export const env = {
    PORT,
    JWT,
    URL_API,
    SECRETKEY,
    URL_CLIENT,
    MONGODB_URI,
    EMAIL_PASS,
    EMAIL_USER
}