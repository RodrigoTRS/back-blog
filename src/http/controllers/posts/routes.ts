import express from "express";
import { getPostById } from "./get-post-by-id";
import { createPost } from "./create-post";
import { fetchPosts } from "./fetch-posts";
import { getMainPost } from "./get-main-post";
import { updateMainPost } from "./update-main-post";
import { getPostBySlug } from "./get-post-by-slug";

export const postsRouter = express.Router();

postsRouter.get("/", fetchPosts)
postsRouter.get("/main", getMainPost)
postsRouter.get("/id/:id", getPostById)
postsRouter.get("/slug/:slug", getPostBySlug)


postsRouter.post("/", createPost)

postsRouter.patch("/main/:id", updateMainPost)

