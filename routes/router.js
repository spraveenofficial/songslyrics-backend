import { Router } from "express";
import Controllers from "../controllers/web.controller.js";
const route = Router();

route.use("/total", Controllers.getTotalSongs);
route.use("/lyrics/:song", Controllers.specificLyrics);
route.get("/album/:name", Controllers.getSpecificAlbumSongs);
route.get("/artist/:name", Controllers.getSpecificArtistLyrics);
route.get("/genre/:name", Controllers.getSpecificGenreSongs);

export default route;
