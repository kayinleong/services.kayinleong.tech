import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home-module/home-module.module').then((m) => m.HomeModule),
      },
      {
        path: 'services/ffmpeg-img-convert',
        loadChildren: () =>
          import('./modules/ffmpeg-img-convert-module/ffmpeg-img-convert-module.module').then((m) => m.FfmpegImgConvertModule),
      }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
