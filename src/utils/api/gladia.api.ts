import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export async function uploadAudio(apiKey: string, audioFilePath: string) {
  const formData = new FormData();

  formData.append("audio", fs.createReadStream(audioFilePath));

  const response = await axios.post(
    "https://api.gladia.io/v2/upload",
    formData,
    {
      headers: {
        "x-gladia-key": apiKey,
        "Content-Type": "multipart/form-data",
        ...formData.getHeaders(),
      },
    }
  );

  return response.data.audio_url;
}

export async function createTranscribeAudio(
  apiKey: string,
  audioUrl: string,
  targetLang: string
) {
  const response = await axios.post(
    "https://api.gladia.io/v2/transcription",
    {
      audio_url: audioUrl,
      translation: true,
      translation_config: {
        target_languages: [targetLang],
        model: "base"
      }
    },
    {
      headers: {
        "x-gladia-key": apiKey,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.id;
}

export async function getTranscription(transcribeId: string, apiKey:string): Promise<any>{
  let transcription;

  do {
    const response = await axios.get(`https://api.gladia.io/v2/transcription/${transcribeId}`, {
      headers: {
        'x-gladia-key': apiKey,
        'Content-Type': 'application/json',
      }
    })

    if(response.data.result){
      transcription = response.data.result.translation.results[0].utterances
    } else {
      await new Promise((resolve) => setTimeout(resolve, 10000))
    }
  }while(!transcription)
  
  return transcription
}