import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import 'flowbite';

import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';

@NgModule({
  declarations: [AppComponent, DefaultLayoutComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
