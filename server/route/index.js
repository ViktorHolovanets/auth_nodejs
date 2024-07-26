import express from "express"
import {registerValidation, loginValidation} from "../validators/authValidators.js"
import { getAll, login, logout, register, refresh } from "../controllers/authController.js"
const route = express.Router();
route.post("/register",registerValidation, register);
route.post("/login",loginValidation, login);
route.post("/logout", logout);
route.post("/refresh", refresh);
route.get("/all", getAll);
export default route;