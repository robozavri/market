import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { MyProductsComponent } from './my-products/my-products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
  path: '',
  component: AccountComponent,
  children: [
    {
      path: 'my-products',
      // component: MyProductsComponent,
      loadChildren: () => import('./my-products/my-products.module').then(m => m.MyProductsModule)
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
