import rateLimit from "express-rate-limit";



const WINDOW_MS = 15 * 60 * 1000; // 15 min
const MAX_REQUESTS = 30;

export const authRateLimiter = rateLimit({
    windowMs: WINDOW_MS,
    max: MAX_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many attempts, please try again later' },
})
