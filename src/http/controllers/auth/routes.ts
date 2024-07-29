import express from "express";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { logout } from "./logout";

export const authRouter = express.Router();

authRouter.post("/register", register)
authRouter.post("/login", authenticate)
authRouter.post("/logout", logout)