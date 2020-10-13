import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [],
  imports: [
    HomePageRoutingModule,
    SharedModule,
    CommonModule
  ]
})
export class HomePageModule { }
