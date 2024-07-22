import bcrypt from 'bcryptjs';
import User from "../models/db/User.js";
import tokenService from './tokenService.js';

const userService = {
    registerUser: async (userData) => {
        const isUser = await User.findOne({where:{ email: userData.email }});
        if (isUser) {
            throw new Error('User already registered');
        }
       
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(userData.password, salt);
       
        const newUser = await User.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            birthday: userData.birthday,
            email: userData.email,
            password: hash
        });

        const tokens = tokenService.generateToken({ id: newUser.id });
        await tokenService.saveToken(newUser.id, tokens.refreshToken);

        return {
            user: newUser,
            ...tokens
        };
    },
    loginUser: async (email, password) => {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            throw new Error('Incorrect email or password');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new Error('Incorrect email or password');
        }
        const tokens = tokenService.generateToken({ id: user.id });
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            user,
            ...tokens
        };
    },
    logout: async (refreshToken) => {
        return await tokenService.removeToken(refreshToken);
    }
};

export default userService;
