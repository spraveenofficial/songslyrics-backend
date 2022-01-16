import songs from "../database/models/songs.js";
import AppData from "../lib/error.js";
class Controller {
  async getTotalSongs() {
    return await songs.find().countDocuments();
  }
  async specificLyrics(req, res) {
    const songName = req.params.song;
    const songData = await songs.findOne({ url: songName });
    songData
      ? res.json(new AppData(true, songData, 200))
      : res.json(new AppData(false, "Not found", 404));
  }
}

export default new Controller();
