import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResourceUrlPipe } from './pipes/resource-url.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangService } from './services/lang.service';
import { CookieService } from 'ngx-cookie-service';
import { LanguageComponent } from './components/language/language.component';
import { CategoryApiService } from './http/category-api.service';
import { AuthService } from './services/auth.service';
import { CategoriesComponent } from './components/categories/categories.component';
import { FilterPipe } from './pipes/filter.pipe';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [
    ResourceUrlPipe,
    FilterPipe,
    LanguageComponent,
    CategoriesComponent,
    WishlistComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ResourceUrlPipe,
    FilterPipe,
    TranslateModule,
    LanguageComponent,
    CategoriesComponent,
    WishlistComponent,
    LogoComponent
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        LangService,
        TranslateService,
        CookieService,
        CategoryApiService
      ]
    };
  }
}
