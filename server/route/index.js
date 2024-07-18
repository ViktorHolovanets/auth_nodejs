import express from "express"
import { getAll, login, register } from "../controllers/authController.js"
const route = express.Router();
route.post("/register", register);
route.post("/login", login);
route.get("/all", getAll);
export default route;