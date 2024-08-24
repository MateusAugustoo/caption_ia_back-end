import express, { Request, Response } from "express";
import multer from "multer";
import helmet from "helmet";

const ffmpeg = require('fluent-ffmpeg')
const cors = require('cors')

const app = express();
const port = 3000;

const upload = multer({ dest: "uploads/" });

app.use(helmet())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST'],
  allowedHeaders: ['Content-Type'],
}))

app.post(
  "/api/upload",
  upload.single("video"),
  (req: Request, res: Response) => {
    try {
      
    } catch (error) {
      
    }
  }
);

app.listen(port, () => {
  console.log('Ta rodando misera')
});

/*
400 Nenhum video foi enviado
406 o video deve ter duração máximo de 1 min
*/