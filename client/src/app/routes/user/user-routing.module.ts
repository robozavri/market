import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [],
  },
  {
    path: '',
    canActivate: [],
    component: UserComponent,
    children: [
      {
				path: 'dashboard',
				loadChildren: () => import('./routes/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
