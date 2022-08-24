import express from "express"
import commentRoutes from "./Comment.routes"

export default express.Router()
    .get("/", (req, res) => res.json("Hello World"))
    .use("/comments", commentRoutes)
    
