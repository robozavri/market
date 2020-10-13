import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiteLayoutComponent } from './layouts/lite-layout/lite-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
      path: '',
      component: MainLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: () => import('./routes/home-page/home-page.module').then(m => m.HomePageModule)
        },
      ]
  },
  {
      path: 'authentification',
      component: LiteLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: () => import('./routes/authentification/authentification.module').then(m => m.AuthentificationModule)
        },
      ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
