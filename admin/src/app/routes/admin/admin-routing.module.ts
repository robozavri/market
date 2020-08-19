import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuardService } from './admin-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'info',
    pathMatch: 'full',
    canActivate: [AdminGuardService],
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuardService],
    children: [
      {
        path: 'info',
        loadChildren: './routes/info/info.module#InfoModule'
      },
      {
        path: 'meta',
        loadChildren: './routes/meta/meta.module#MetaModule'
      },
      {
        path: 'articles',
        loadChildren: './routes/articles/articles.module#ArticlesModule'
      },
      {
        path: 'products',
        loadChildren: './routes/products/products.module#ProductsModule'
      },
      {
        path: 'product/:id',
        loadChildren: './routes/product/product.module#ProductModule'
      },
      {
        path: 'product/new',
        loadChildren: './routes/product/product.module#ProductModule'
      },
      {
        path: 'categories',
        loadChildren: './routes/categories/categories.module#CategoriesModule'
      },
      {
        path: 'category/:id',
        loadChildren: './routes/category/category.module#CategoryModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
