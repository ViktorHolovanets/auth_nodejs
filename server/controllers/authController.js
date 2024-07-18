import User from "../models/db/User.js";
import bcrypt from "bcryptjs"
export const register = async (req, res) => {
    try {
        const { firstName, lastName, birthday, email, password } = req.body;
        const isUser = await User.findOne({ where: { email } })
        if (isUser) {
            return res.status(400).json({ message: "User register" })
        }
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        await User.create({ firstName, lastName, birthday, email, password: hash });
        let users = await User.findAll();
        res.json(users)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', user });
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