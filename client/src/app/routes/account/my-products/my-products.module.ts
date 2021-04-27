import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProductsComponent } from './my-products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyProductsRoutingModule } from './my-products-routing.module';



@NgModule({
  declarations: [MyProductsComponent],
  imports: [
    CommonModule,
    MyProductsRoutingModule,
    SharedModule,
  ],
  // exports: [MyProductsComponent]
})
export class MyProductsModule { }
