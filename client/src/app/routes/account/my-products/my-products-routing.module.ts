import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProductsComponent } from './my-products.component';

const routes: Routes = [{
  path: '',
  component: MyProductsComponent,
  children: [],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProductsRoutingModule { }
