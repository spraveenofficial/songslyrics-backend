import { Router } from "express";
import Controllers from "../controllers/web.controller.js";
const route = Router();

const data = new Controllers();
// route.use("/genre:genreName");
route.use("/total", (req, res) => {
    res.json("ok")
});

export default route;
