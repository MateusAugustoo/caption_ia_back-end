import { Response, Request } from "express";
import { FfprobeData } from "fluent-ffmpeg";
import fs from "fs";
import { convertVideoToMp3 } from "./convert/convertVideoToMp3";
import { processVideoToStr } from "./processVideoToStr";

import ffmpeg from "fluent-ffmpeg";
import { addSubtitleToVideo } from "./Ffmpeg/addSubtitleToVideo";

export async function controllerFfmpeg(
  videoPath: string,
  res: Response,
  audioFilePath: string,
  caption: string,
  videoFile: Express.Multer.File
) {
  ffmpeg.ffprobe(
    videoPath,
    async (err: Error | null, metadata: FfprobeData) => {
      const durationInSecond = metadata.format.duration;
      const subtitlePath = `src/srt/${videoFile?.filename}.srt`;
      const videoWithSubtitlePath = `src/output/${videoFile?.filename}.mp4`;

      if (durationInSecond !== undefined && durationInSecond > 60) {
        fs.unlinkSync(videoPath);
        res.status(400).send("Video must have a maximum duration of 1 min");
      }

      await convertVideoToMp3(videoPath, `src/audios/${videoFile?.filename}.mp3`);

      await processVideoToStr(
        process.env.API_KEY!,
        audioFilePath,
        caption,
        subtitlePath
      );

      await addSubtitleToVideo(videoPath, subtitlePath, videoWithSubtitlePath, audioFilePath);
    }
  );
}
