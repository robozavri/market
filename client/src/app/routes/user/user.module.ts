import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class UserModule { }
