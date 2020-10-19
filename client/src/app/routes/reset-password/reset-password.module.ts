import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    ResetPasswordRoutingModule,
    SharedModule,
    CommonModule
  ]
})
export class ResetPasswordModule { }
