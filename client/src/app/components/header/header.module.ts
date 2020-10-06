import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo/logo.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../components.module';


@NgModule({
  declarations: [HeaderComponent, LogoComponent, WishlistComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
  ],
  exports: [HeaderComponent, LogoComponent, WishlistComponent]

})
export class HeaderModule { }
