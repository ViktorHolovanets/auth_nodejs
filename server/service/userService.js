import bcrypt from 'bcryptjs';
import User from "../models/db/User.js";
import tokenService from './tokenService.js'; // імпорт вашого tokenService

const userService = {
    registerUser: async (userData) => {
        // Перевірка наявності користувача в базі даних
        const isUser = await User.findOne({ email: userData.email });
        if (isUser) {
            throw new Error('User already registered');
        }

        // Хешування паролю
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(userData.password, salt);

        // Створення нового користувача
        const newUser = await User.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            birthday: userData.birthday,
            email: userData.email,
            password: hash
        });

        // Генерація токенів
        const tokens = tokenService.generateToken({ id: newUser.id });
        await tokenService.saveToken(newUser.id, tokens.refreshToken);

        return {
            user: newUser,
            ...tokens
        };
    },
    login: async (email, password) => {
        const user = await User.findOne({where:{ email }});
        if (!user) {
            throw new Error('User 454545already registered');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('User 4545454already registered');
        }
        const tokens = tokenService.generateToken({ id: user.id });
        await tokenService.saveToken(newUser.id, tokens.refreshToken);

        return {
            user: newUser,
            ...tokens
        };
    }
};

export default userService;
