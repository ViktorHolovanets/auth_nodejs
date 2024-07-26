import jwt from 'jsonwebtoken'
import TokenRefresh from "../models/db/TokenRefresh.js"
import dotenv from "dotenv"

dotenv.config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const tokenService = {
    generateToken: (payload) => {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30h' })
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    },
    saveToken: async (userId, refreshToken) => {
        const oldToken = await TokenRefresh.findOne({ where: { user_id: userId } })
        if (oldToken) {
            oldToken.token = refreshToken;
            return await oldToken.save();
        }
        const token = await TokenRefresh.create({ user_id: userId, token: refreshToken })
        return token
    },
    removeToken: async (refreshToken) => {

        const token = await TokenRefresh.destroy({ where: { token: refreshToken } })
        return token
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
    getTokenById: async (token) => {
        try {          
            const tokenData = await TokenRefresh.findOne({where:{token}});    
            return tokenData;
        } catch (err) {           
            return null;
        }
    },

}
export default tokenService;