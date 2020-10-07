import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist/wishlist.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [ WishlistComponent, LogoComponent],
  imports: [
    CommonModule,
  ],
  exports: [ WishlistComponent, LogoComponent]
})
export class ComponentsModule { }
