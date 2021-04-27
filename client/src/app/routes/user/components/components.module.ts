import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { HeadingComponent } from './heading/heading.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    NavigationComponent,
    HeadingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    NavigationComponent,
    HeadingComponent,
    SharedModule
  ]
})
export class ComponentsModule { }
