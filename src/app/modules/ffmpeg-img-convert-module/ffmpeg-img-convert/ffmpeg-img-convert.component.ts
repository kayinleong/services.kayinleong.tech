import { Component } from '@angular/core';

import { FfmpegService } from 'src/app/services/ffmpeg-service.service';

@Component({
  selector: 'app-ffmpeg-img',
  templateUrl: './ffmpeg-img-convert.component.html',
  styleUrls: ['./ffmpeg-img-convert.component.css']
})
export class FfmpegImgConvertComponent {
  imgFile: FileList | null = null;
  imgFileNames: string[] = [];
  imgFileExt: string = '';
  errors: string[] = [];

  constructor(
    private ffmpegService: FfmpegService
  ) {}

  async onFormSubmit() {
    this.errors = [];

    if (!this.imgFile || this.imgFile?.length <= 0) {
      this.errors.push('Please upload at least an image file.');
    }

    if (!this.imgFileExt) {
      this.errors.push('Please select an image file extension.');
    }

    if (this.imgFile && this.imgFile.length > 0 && this.imgFileExt) {
      for (let index = 0; index < this.imgFile.length; index++) {
        const element = this.imgFile[index];
        const data = {
          data: element,
          ext: this.imgFileExt,
        }
        this.ffmpegService.ffmpegWorker?.postMessage(data);
      }
    }
  }

  async onFileChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;

    let fileList: FileList | null = element.files;
    if (fileList) {
      this.imgFile = fileList;

      this.imgFileNames = [];
      for (let index = 0; index < fileList.length; index++) {
        const element = fileList[index];
        this.imgFileNames.push(element.name);
      }
    }
  }
}
