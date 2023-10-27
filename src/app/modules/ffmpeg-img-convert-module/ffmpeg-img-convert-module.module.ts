import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FfmpegImgConvertRoutingModule } from './ffmpeg-img-convert-routing.module';
import { FfmpegImgConvertComponent } from './ffmpeg-img-convert/ffmpeg-img-convert.component';
import { FfmpegService } from 'src/app/services/ffmpeg-service.service';
import { FfmpegImgConvertHomeComponent } from './ffmpeg-img-convert-home.component';


@NgModule({
  declarations: [FfmpegImgConvertHomeComponent, FfmpegImgConvertComponent],
  providers: [FfmpegService],
  imports: [CommonModule, FormsModule, FfmpegImgConvertRoutingModule]
})
export class FfmpegImgConvertModule { }
