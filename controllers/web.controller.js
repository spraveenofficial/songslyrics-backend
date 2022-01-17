import songs from "../database/models/songs.js";
import AppData from "../lib/error.js";
class Controller {
  async getTotalSongs(req, res) {
    const total = await songs.find().countDocuments();
    total
      ? res.json(new AppData(true, total, 200))
      : res.json(new AppData(false, "Not Found", 404));
  }
  async specificLyrics(req, res) {
    const songName = req.params.song;
    const songData = await songs.findOne({ url: songName });
    songData
      ? res.json(new AppData(true, songData, 200))
      : res.json(new AppData(false, "Not found", 404));
  }
  async getSpecificAlbumSongs(req, res) {
    const albumName = req.params.name.replace(/-/g, " ").trim();
    const song = await songs
      .find({ albumName: albumName })
      .collation({ locale: "en", strength: 2 });
    song.length > 1
      ? res.json(new AppData(true, song, 200))
      : res.json(new AppData(false, "Not found", 404));
  }
  async getSpecificArtistLyrics(req, res) {
    const artistQuery = req.params.name;
    const regex = new RegExp(artistQuery, "i");
    const song = await songs.find({ songArtist: regex });
    song.length > 1
      ? res.json(new AppData(true, song, 200))
      : res.json(new AppData(false, "Not found", 404));
  }
  async getSpecificGenreSongs(req, res) {
    const genreName = req.params.name;
    const regex = new RegExp(genreName, "i");
    const song = await songs.find({ songLanguage: regex }).limit(20);
    song.length > 1
      ? res.json(new AppData(true, song, 200))
      : res.json(new AppData(false, "Not found", 404));
  }
  async userRequest(req, res) {
    const { name, email, requestType, songName } = req.body;
    !name || !email || !requestType || !songName
      ? res.json({
          message: "All fields are required",
          success: false,
          statusCode: 204,
        })
      : res.json({
          message: "Successfully Requested",
          success: true,
          statusCode: 200,
        });
  }
}

export default new Controller();
