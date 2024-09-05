
import { createTranscribeAudio, getTranscription, uploadAudio } from "./api/gladia.api";
import { convertToStr } from "./convert/covertToStr";
import { saveStrFile } from "./saveStrFile";

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
    console.log(transcription)

    if(transcription !== undefined) {
      // const strContent = convertToStr(transcription)
      // saveStrFile(outputFilePath, strContent)
      console.log(transcription)
    }

    // const strContent = convertToStr(transcription)
    // saveStrFile(outputFilePath, strContent)
  } catch (error) {
    console.error(error)
    console.log("eita ideia de girico, larga o back-end") 
  }
}
