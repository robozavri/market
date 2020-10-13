import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { langs } from '../constants/lang';
import { ge, en, ru } from '../constants/translate';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const LOCAL_LANG_KEY = 'local-lang';

@Injectable()
export class LangService {

  currentLang$: Observable<string>;
  private stringSubject: Subject<string>;

  constructor(private cookieService: CookieService, private translateService: TranslateService) { 
    this.stringSubject = new Subject<string>();
    this.currentLang$ = this.stringSubject.asObservable();
  }

  init() {
    const lang = this.getCurrent() || langs.EN;
    this.translateService.setTranslation(langs.EN, en);
    this.translateService.setTranslation(langs.GE, ge);
    this.translateService.setTranslation(langs.RU, ru);
    this.translateService.use(lang);
  }

  getCurrent() {
    return localStorage.getItem('lang') || 'ge';
    // return this.cookieService.get(LOCAL_LANG_KEY) || 'en';
  }

  use(lang: string) { console.log('lang', lang)
    localStorage.setItem('lang', lang);
    this.stringSubject.next(lang);
    this.translateService.use(lang);
    // this.currentLang$ = lang;
    // this.cookieService.set(LOCAL_LANG_KEY, lang);
  }

}