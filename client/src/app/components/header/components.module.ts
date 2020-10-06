import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HeaderComponent } from './header/header.component';
// import { SharedModule } from '../shared/shared.module';
import { WishlistComponent } from './wishlist/wishlist.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [ WishlistComponent, LogoComponent],
  imports: [
    CommonModule,
    // SharedModule,
  ],
  exports: [ WishlistComponent, LogoComponent]
})
export class ComponentsModule { }
