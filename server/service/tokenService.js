import jwt from 'jsonwebtoken'
import TokenRefresh from "../models/db/TokenRefresh.js"
const JWT_ACCESS_SECRET = 'fdhfghgjhjhjkjjkjf';
const JWT_REFRESH_SECRET = 'fdhfdfgdfgfghghytthbnttjy,.i,kjjkjf';

const tokenService = {
    generateToken: (payload) => {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30s' })
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    },
    saveToken: async (userId, refreshToken) => {
        const oldToken = await TokenRefresh.findOne({ user_id: userId })
        if (oldToken) {
            oldToken.refreshToken = refreshToken;
            return oldToken.save();
        }
        const token = await TokenRefresh.create({user_id:userId, token:refreshToken})
        return token
    }
}
export default tokenService;