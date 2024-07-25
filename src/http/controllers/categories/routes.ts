import express from "express";
import { createCategory } from "./create-category";
import { fetchCategories } from "./fetch-categories";

export const categoriesRouter = express.Router();

categoriesRouter.post("/", createCategory)
categoriesRouter.get("/", fetchCategories)
