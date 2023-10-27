import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FfmpegService {
  public ffmpegWorker: Worker | null = null;

  constructor() {
    if (typeof Worker !== 'undefined' && this.ffmpegWorker === null) {
      this.ffmpegWorker = new Worker(new URL('../workers/ffmpeg-worker.worker', import.meta.url));
      this.ffmpegWorker.onmessage = ({ data }) => {
        const blob = new Blob([data.data], { type: data.mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.outFilename;
        a.click();
      };
      this.ffmpegWorker.onerror = (e) => {
        console.log(`FFMPEG Service Error: ${e}`);
      }
      this.ffmpegWorker.onmessageerror = (e) => {
        console.log(`FFMPEG Service Message Error: ${e}`);
      }
    }
  }
}
