import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductRoutingModule } from './add-product-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    AddProductRoutingModule,
    SharedModule,
    CommonModule
  ]
})
export class AddProductModule { }
