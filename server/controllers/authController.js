import userService from "../service/userService.js";

const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
    });
};

export const register = async (req, res, next) => {
    try {
        const { firstName, lastName, birthday, email, password } = req.body;
        const result = await userService.registerUser({ firstName, lastName, birthday, email, password });
        setRefreshTokenCookie(res, result.refreshToken);
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
        const result = await userService.loginUser(email, password);
        setRefreshTokenCookie(res, result.refreshToken);
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
        const result = await userService.logoutUser(refreshToken);
        res.clearCookie("refreshToken");
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const result = await userService.refresh(refreshToken);
        setRefreshTokenCookie(res, result.refreshToken);
        res.json({
            token: result.accessToken,
            user: result.user.id,
        });
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
};