import { env } from "./dotenv";

export const WHITELIST_DOMAINS = [
    env.URL_API, env.URL_CLIENT, 'http://localhost:5173'
]

export const TYPE_EMPLOYEE = {
    admin: "admin",
    user: "user",
    adminControl: "admin-control"
};

const apiRoot = process.env.BUILD_MODE === 'dev'
    ? "http://localhost:8082"
    : process.env.BUILD_MODE === 'production'
        ? env.URL_API
        : '';
export const BaseServer = apiRoot

const apiClient = process.env.BUILD_MODE === 'dev'
    ? "http://localhost:5173"
    : process.env.BUILD_MODE === 'production'
        ? env.URL_CLIENT
        : '';
export const BaseClient = apiClient
