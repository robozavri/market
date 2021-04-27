import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LiteLayoutComponent } from './layouts/lite-layout/lite-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { GuestGuard } from './guest.guard';

const routes: Routes = [{
  path: '',
  // canActivate: [AuthGuard],
  // canActivate: [GuestGuard],
  children: [
  {
      path: 'home',
      component: MainLayoutComponent,
      canActivate: [GuestGuard],
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
      canActivate: [GuestGuard],
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
    canActivate: [GuestGuard],
    loadChildren: () =>
    import('./routes/email-activation-success/email-activation-success.module').then(m => m.EmailActivationSuccessModule)
  },
  {
    path: 'forgot-password',
    component: LiteLayoutComponent,
    canActivate: [GuestGuard],
    loadChildren: () =>
    import('./routes/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'reset-password',
    component: LiteLayoutComponent,
    canActivate: [GuestGuard],
    loadChildren: () =>
    import('./routes/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./routes/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'account',
    component: LiteLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./routes/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'add-product',
    component: LiteLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./routes/add-product/add-product.module').then(m => m.AddProductModule)
  },
  { path: '**', redirectTo: 'home' }
]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard]
})
export class AppRoutingModule { }
