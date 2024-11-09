import rateLimit from 'express-rate-limit';

function createRateLimiter(time, limit) {
    return rateLimit({
        windowMs: time * 60 * 1000,
        limit: limit,
        message: {
            status: 429,
            message: `Quá nhiều yêu cầu, vui lòng thử lại sau ${time} phút`
        }
    });
}

const File = createRateLimiter(1, 100);
const All = createRateLimiter(1, 500);
const User = createRateLimiter(1, 100);
const Admin = createRateLimiter(1, 50);
const Bank = createRateLimiter(1, 10);
const Auth = createRateLimiter(5, 10);
const One = createRateLimiter(1, 60);
const Private = createRateLimiter(120, 1);

export const rateLimiter = {
    All,
    User,
    Admin,
    File,
    Bank,
    Auth,
    One,
    Private
}