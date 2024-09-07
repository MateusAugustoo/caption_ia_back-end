import fs from "fs";

export function saveSrtFile(outputPath: string, srt: string): void {
  fs.writeFileSync(outputPath, srt, "utf-8");
}