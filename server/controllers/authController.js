import User from "../models/db/User.js";
import userService from "../service/userService.js"


export const register = async (req, res) => {
    try {
        const { firstName, lastName, birthday, email, password } = req.body;

       /* // Валідація вхідних даних (опційно)
        if (!firstName || !lastName || !birthday || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }*/

        // Виклик сервісу реєстрації
        const result = await userService.registerUser({ firstName, lastName, birthday, email, password });

        // Встановлення кукі з refreshToken
        res.cookie("refreshToken", result.refreshToken, { 
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 днів
            httpOnly: true 
        });

        // Відповідь з accessToken та ID користувача
        res.json({ 
            token: result.accessToken,
            user: result.user.id
        });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: error.message }); // Змінено на 500, якщо це помилка сервера
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const result = await userService.login(email,password);

        // Встановлення кукі з refreshToken
        res.cookie("refreshToken", result.refreshToken, { 
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 днів
            httpOnly: true 
        });

        // Відповідь з accessToken та ID користувача
        res.json({ 
            token: result.accessToken,
            user: result.user.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}