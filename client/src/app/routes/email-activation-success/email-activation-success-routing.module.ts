import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailActivationSuccessComponent } from './email-activation-success.component';

const routes: Routes = [{
  path: '',
  component: EmailActivationSuccessComponent,
  children: [],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailActivationSuccessRoutingModule { }
