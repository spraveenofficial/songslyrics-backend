import songs from "../database/models/songs.js";
class Controller {
  async getTotalSongs() {
    return await songs.find().countDocuments();
  }
}

export default Controller;
