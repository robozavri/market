import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResourceUrlPipe } from './pipes/resource-url.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangService } from './services/lang.service';
import { CookieService } from 'ngx-cookie-service';
// import { HeaderModule } from '../components/header/header.module';
import { LanguageComponent } from './components/language/language.component';
import { CategoryApiService } from './http/category-api.service';
import { AuthService } from './services/auth.service';
import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
  declarations: [ResourceUrlPipe, LanguageComponent, CategoriesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    // HeaderModule,
  ],
  exports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ResourceUrlPipe,
    TranslateModule,
    // HeaderModule,
    LanguageComponent,
    CategoriesComponent
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
