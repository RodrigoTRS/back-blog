import express from "express";
import { createMenuOption } from "./create-menu-option";
import { fetchMenuOptions } from "./fetch-menu-options";

export const menuRouter = express.Router();

menuRouter.get("/", fetchMenuOptions)
menuRouter.post("/", createMenuOption)

