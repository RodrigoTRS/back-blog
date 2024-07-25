import express, { json } from "express"
import cors from "cors"
import { postsRouter } from "./http/controllers/posts/routes"
import { categoriesRouter } from "./http/controllers/categories/routes"
import { menuRouter } from "./http/controllers/menu/routes"

export const app = express()

app.use(cors())
app.use(json())

app.use("/posts", postsRouter)
app.use("/categories", categoriesRouter)
app.use("/menu", menuRouter)