import fs from "fs";

export function saveStrFile(outputPath: string, str: string): void {
  fs.writeFileSync(outputPath, str, "utf-8");
}