import ffmpeg from "fluent-ffmpeg";

// add subtitle to video ffmpeg output format .mp4
export function addSubtitleToVideo(videoPath: string, subtitlePath: string, outputPath: string, audioFilePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
    .input(audioFilePath)
    .outputOption('-vf', `subtitles=${subtitlePath}`)
    .output(outputPath)
    .on('end', () => {
      console.log('Deu certo, Oh Gloria')
      resolve()
    })
    .on('error', (err) => {
      console.error('Desiste cara, deu ruim', err)
      reject(err)
    })
    .run()
  })
}