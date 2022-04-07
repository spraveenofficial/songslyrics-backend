import { requestNewSong } from "./controllers/telegram.js";
const testFunction = () => {
  requestNewSong({
    name: "Praveen",
    email: "deomfi",
    requestType: "SONG",
    songName: "FRE",
  });
};

testFunction();
