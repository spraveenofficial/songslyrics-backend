import mongoose from "mongoose";
const songSchema = new mongoose.Schema(
  {
    songId: {
      type: "String",
      required: true,
    },
    songName: {
      type: "String",
      required: true,
    },
    url: {
      type: "String",
      // required: true,
      unique: true,
    },
    albumId: {
      type: "String",
      required: true,
    },
    albumName: {
      type: "String",
      required: true,
    },
    year: {
      type: "String",
    },
    songReleaseDate: {
      type: "String",
    },
    songDuration: {
      type: "String",
      required: true,
    },
    songPlayCount: {
      type: "String",
      required: true,
    },
    songLanguage: {
      type: "String",
      required: true,
    },
    songArtist: {
      type: "String",
      required: true,
    },
    songImage: {
      type: "String",
      required: true,
    },
    songLink: {
      type: "String",
      required: true,
    },
    albumLink: {
      type: "String",
    },
    songLabel: {
      type: "String",
    },
    copyright: {
      type: "String",
      // required: true
    },
    downloadUrl: {
      type: [String],
      default: [],
    },
    lyrics: {
      type: "String",
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "SongsLyrics",
  }
);

const Song = mongoose.model("SongsLyrics", songSchema);

export default Song
