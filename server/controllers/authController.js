import User from "../models/db/User.js";
import userService from "../service/userService.js"

export const register = async (req, res, next) => {
    try {
        const { firstName, lastName, birthday, email, password } = req.body;
        const result = await userService.registerUser({ firstName, lastName, birthday, email, password });
        res.cookie("refreshToken", result.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        res.json({
            token: result.accessToken,
            user: result.user.id,
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser( email, password );
        res.cookie("refreshToken", result.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        res.json({
            token: result.accessToken,
            user: result.user.id,
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const token = await userService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(token);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
}