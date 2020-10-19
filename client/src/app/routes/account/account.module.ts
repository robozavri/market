import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountComponent } from './account.component';



@NgModule({
  declarations: [AccountComponent],
  imports: [
    AccountRoutingModule,
    SharedModule,
    CommonModule
  ]
})
export class AccountModule { }
