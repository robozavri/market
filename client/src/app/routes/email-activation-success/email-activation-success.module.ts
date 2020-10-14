import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailActivationSuccessRoutingModule } from './email-activation-success-routing.module';
import { EmailActivationSuccessComponent } from './email-activation-success.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EmailActivationSuccessComponent],
  imports: [
    CommonModule,
    EmailActivationSuccessRoutingModule,
    SharedModule,
  ],
  exports: [EmailActivationSuccessComponent]
})
export class EmailActivationSuccessModule { }
