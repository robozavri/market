import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ FooterComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [ FooterComponent]
})
export class ComponentsModule { }
