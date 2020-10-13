import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { LiteHeaderComponent } from './lite-header/lite-header.component';

@NgModule({
  declarations: [ FooterComponent, LiteHeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [ FooterComponent,LiteHeaderComponent]
})
export class ComponentsModule { }
