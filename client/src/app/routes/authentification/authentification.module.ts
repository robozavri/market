import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthentificationComponent } from './authentification.component';



@NgModule({
  declarations: [AuthentificationComponent],
  imports: [
    AuthentificationRoutingModule,
    SharedModule,
    CommonModule,
    NgxCaptchaModule
  ]
})
export class AuthentificationModule { }
