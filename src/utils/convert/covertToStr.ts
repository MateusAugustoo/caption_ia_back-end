export function convertToSrt(transcription: any[]): string {
  let str = "";

  transcription.forEach((item: any, index: number) => {
    const timeStart = formatTimeForSrt(item.start);
    const timeEnd = formatTimeForSrt(item.end);

    str += `${index + 1}\n${timeStart} --> ${timeEnd}\n${item.text}\n\n`;
  });

  return str;
}

function formatTimeForSrt(time: number) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = Math.floor(time - hours * 3600 - minutes * 60);
  const milliseconds = Math.floor(
    (time - hours * 3600 - minutes * 60 - seconds) * 1000
  );

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(3, "0")}`;
}
