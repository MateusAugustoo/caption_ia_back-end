
import { createTranscribeAudio, getTranscription, uploadAudio } from "./api/gladia.api";
import { convertToSrt } from "./convert/covertToStr";
import { saveSrtFile } from "./saveSrtFile";

export async function processVideoToStr(
  apiKey: string,
  audioFilePath: string,
  targetLang: string,
  outputFilePath: string
) {
  try {
    const audioUrl = await uploadAudio(apiKey, audioFilePath)
    const transcribeId = await createTranscribeAudio(apiKey, audioUrl, targetLang)
    const transcription = await getTranscription(transcribeId, apiKey)

    if(transcription !== undefined) {
      const srtContent = convertToSrt(transcription)
      saveSrtFile(outputFilePath, srtContent)
    }
  } catch (error) {
    console.error(error)
    console.log("eita ideia de girico, larga o back-end") 
  }
}
