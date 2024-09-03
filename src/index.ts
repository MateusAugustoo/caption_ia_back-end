import express, { Request, Response } from "express";
import multer from "multer";
import helmet from "helmet";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { FfprobeData } from "fluent-ffmpeg";
import axios from "axios";

const ffmpeg = require("fluent-ffmpeg");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT;

const upload = multer({ dest: "uploads/" });

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

      ffmpeg.ffprobe(
        videoPath,
        async (err: Error | null, metadata: FfprobeData) => {
          const durationInSecond = metadata.format.duration;

          if (durationInSecond !== undefined && durationInSecond > 60) {
            fs.unlinkSync(videoPath);
            res.status(400).send("Video must have a maximum duration of 1 min");
          }

          await convertVideoToMp3(
            videoPath,
            `audios/${videoFile?.filename}.mp3`
          );
          const audioPath = path.resolve(`audios/${videoFile?.filename}.mp3`);
        }
      );
    } catch (error) {}
  }
);

app.listen(port, () => {
  console.log("Server started on port " + port);
});

function convertVideoToMp3(
  videoPath: string,
  audioPath: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .output(audioPath)
      .on("end", () => {
        console.log("converted");
        resolve();
      })
      .on('error', (err: Error) => {
        console.log(err);
        reject(err);
      }).run();
  });
}

// List do fumo de amanhão: 
async function uploadAudio(){}
async function transcribeAudio() {}
async function downloadTranscript() {}