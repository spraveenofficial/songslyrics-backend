import { Router } from "express";
import Controllers from "../controllers/web.controller.js";
const route = Router();

route.use("/total", async (req, res) => {
  res.json({
    total: await Controllers.getTotalSongs(),
  });
});
route.use('/lyrics/:song', Controllers.specificLyrics)

export default route;
