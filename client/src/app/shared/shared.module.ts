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
import { UserApiService } from './http/user-api.service';
import { UniqueEmailValidator } from './validators/unique-email.validator';
import { AccountDropdownComponent } from './components/account-dropdown/account-dropdown.component';
import { SocketService } from './services/socket.service';
import { FilterApiService } from './http/filter-api.service';
import { CityApiService } from './http/city-api.service';
import { ImagesUploadComponent } from './components/images-upload/images-upload.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileApiService } from './http/files-api.service';
import { ProductApiService } from './http/product-api.service';


@NgModule({
  declarations: [
    ResourceUrlPipe,
    FilterPipe,
    LanguageComponent,
    ImagesUploadComponent,
    ImageUploadComponent,
    FileUploadComponent,
    CategoriesComponent,
    WishlistComponent,
    LogoComponent,
    AccountDropdownComponent
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
    ImagesUploadComponent,
    ImageUploadComponent,
    FileUploadComponent,
    LanguageComponent,
    CategoriesComponent,
    WishlistComponent,
    LogoComponent,
    AccountDropdownComponent
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
        UniqueEmailValidator,
        FileApiService,
        CategoryApiService,
        FilterApiService,
        UserApiService,
        SocketService,
        CityApiService,
        ProductApiService,
      ]
    };
  }
}
