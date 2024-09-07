import express, { Request, Response } from "express";
import multer from "multer";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import { controllerFfmpeg } from "./utils/controller";

const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT;

const upload = multer({ dest: "src/uploads/" });

app.use(helmet());
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: process.env.METHODS,
    allowedHeaders: process.env.HEADERS,
  })
);

app.post(
  "/api/upload",
  upload.single("video"),
  async (req: Request, res: Response) => {
    try {
      const videoFile = req.file;
      const caption = req.body.caption;

      const videoPath = path.resolve(videoFile!.path);
      const audioFilePath = path.resolve(`src/audios/${videoFile?.filename}.mp3`);

      await controllerFfmpeg(
        videoPath,
        res,
        audioFilePath,
        caption,
        videoFile as Express.Multer.File
      )
    } catch (error) {}
  }
);

app.listen(port, () => {
  console.log("Server started on port " + port);
});