import mongoose from "mongoose";

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Database Connection Established");
  })
  .catch((err) => {
    console.log("Error while connectin to DB", err);
  });
