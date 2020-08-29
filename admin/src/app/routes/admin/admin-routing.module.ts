import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuardService } from './admin-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
    canActivate: [AdminGuardService],
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuardService],
    children: [
      // {
      //   path: 'info',
      //   loadChildren: './routes/info/info.module#InfoModule'
      // },
      {
        path: 'meta',
        loadChildren: './routes/meta/meta.module#MetaModule'
      },
      {
        path: 'articles',
        loadChildren: './routes/articles/articles.module#ArticlesModule'
      },
      {
        path: 'filters',
        loadChildren: './routes/filters/filters.module#FiltersModule'
      },
      {
        path: 'filter/:id',
        loadChildren: './routes/filter/filter.module#FilterModule'
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
