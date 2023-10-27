import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FfmpegImgConvertHomeComponent } from './ffmpeg-img-convert-home.component';
import { FfmpegImgConvertComponent } from './ffmpeg-img-convert/ffmpeg-img-convert.component';


const routes: Routes = [
  {
    path: '',
    component: FfmpegImgConvertHomeComponent,
  },
  {
    path: 'img-convert',
    component: FfmpegImgConvertComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FfmpegImgConvertRoutingModule {}
