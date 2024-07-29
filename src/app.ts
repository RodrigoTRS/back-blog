import express, { json } from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import { postsRouter } from "./http/controllers/posts/routes"
import { categoriesRouter } from "./http/controllers/categories/routes"
import { menuRouter } from "./http/controllers/menu/routes"
import { helloWorld } from "./http/controllers/hello-world"
import { authRouter } from "./http/controllers/auth/routes"

export const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(json())
app.use(cookieparser())

app.use("/posts", postsRouter)
app.use("/categories", categoriesRouter)
app.use("/menu", menuRouter)
app.use("/auth", authRouter)

app.get("/", helloWorld)