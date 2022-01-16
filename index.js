import Express from "express";
import "dotenv/config";
import cors from "cors";
import "./database/db.js";
import webRouters from "./routes/router.js";
const app = Express();
app.use(Express.urlencoded({ extended: false }));
app.use(Express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

const PORT = process.env.PORT;
app.use("/", (req, res) => {
  res.json({
    message: "Server is Up!",
  });
});

app.use("/api/", webRouters);

app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
