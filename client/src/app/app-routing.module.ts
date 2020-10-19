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
  {
    path: 'email-activation-success',
    component: LiteLayoutComponent,
    loadChildren: () =>
    import('./routes/email-activation-success/email-activation-success.module').then(m => m.EmailActivationSuccessModule)
  },
  {
    path: 'forgot-password',
    component: LiteLayoutComponent,
    loadChildren: () =>
    import('./routes/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'reset-password',
    component: LiteLayoutComponent,
    loadChildren: () =>
    import('./routes/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'account',
    component: LiteLayoutComponent,
    loadChildren: () =>
    import('./routes/account/account.module').then(m => m.AccountModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
