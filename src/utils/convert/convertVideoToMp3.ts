import ffmpeg from "fluent-ffmpeg";

export function convertVideoToMp3(
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
      .on("error", (err: Error) => {
        console.log(err);
        reject(err);
      })
      .run();
  });
}