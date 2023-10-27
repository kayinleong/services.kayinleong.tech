/// <reference lib="webworker" />

import { FFmpeg } from "@ffmpeg/ffmpeg";

const FFMPEG_BASE_URL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd';
let ffmpeg: FFmpeg | null = null;
loadFfmpeg();

addEventListener('message', async ({ data }) => {
  const file: File = data.data;
  const inFilename = file.name;
  const outFilename = inFilename.split('.')[0] + '.' + data.ext;

  const arrayBuffer = await file.arrayBuffer();
  await imgConvert(inFilename, arrayBuffer, outFilename, data.ext);
});

/**
 * Load FFMPEG
 */
async function loadFfmpeg() {
  if (ffmpeg === null) {
    ffmpeg = new FFmpeg();
    await ffmpeg.load({
      coreURL: `${FFMPEG_BASE_URL}/ffmpeg-core.js`,
      wasmURL: `${FFMPEG_BASE_URL}/ffmpeg-core.wasm`,
    });
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    })
    ffmpeg.on("progress", ({ progress }) => {
      console.log(`Progress: ${progress}`);
    });

    await ffmpeg?.exec(['-formats']);
  }
}

/**
 * FFMPEG Image Conversion
 * @param inFilename
 * @param arrayBuffer
 * @param outFilename
 * @param ext
 */
async function imgConvert(inFilename: string, arrayBuffer: ArrayBuffer, outFilename: string, ext: string) {
  ffmpeg?.writeFile(inFilename, new Uint8Array(arrayBuffer));
  await ffmpeg?.exec(['-i', inFilename, outFilename]);
  const outData = await ffmpeg?.readFile(outFilename);

  postMessage({
    data: new Blob([outData!], { type: 'image/' + ext }),
    outFilename: outFilename,
  });
}
