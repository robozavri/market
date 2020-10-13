import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../components.module';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
  ],
  exports: [HeaderComponent]

})
export class HeaderModule { }
