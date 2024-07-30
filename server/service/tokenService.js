import jwt from 'jsonwebtoken';
import redis from '../config/redis.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const tokenService = {
    generateToken: (payload) => {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30h' });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken,
        };
    },

    saveToken: async (userId, refreshToken) => {
        try {
            await redis.set(`refreshToken:${userId}`, refreshToken, 'EX', 30 * 24 * 60 * 60);
            return { user_id: userId, token: refreshToken };
        } catch (err) {
            console.error('Помилка при збереженні токена в Redis:', err);
            throw err;
        }
    },

    removeToken: async (refreshToken) => {
        try {
            const keys = await redis.keys(`refreshToken:*`);
            for (const key of keys) {
                const storedToken = await redis.get(key);
                if (storedToken === refreshToken) {
                    await redis.del(key);
                    return true;
                }
            }
            return false;
        } catch (err) {
            console.error('Помилка при видаленні токена з Redis:', err);
            throw err;
        }
    },

    validateAccessToken: (token) => {
        try {
            return jwt.verify(token, JWT_ACCESS_SECRET);
        } catch (err) {
            return null;
        }
    },

    validateRefreshToken: (token) => {
        try {
            return jwt.verify(token, JWT_REFRESH_SECRET);
        } catch (err) {
            return null;
        }
    },

    getTokenById: async (userId) => {
        try {
            const token = await redis.get(`refreshToken:${userId}`);
            if (!token) return null;
            return { user_id: userId, token };
        } catch (err) {
            console.error('Помилка при отриманні токена з Redis:', err);
            return null;
        }
    },
};

export default tokenService;
