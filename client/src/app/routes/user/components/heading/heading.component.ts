import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {

  user: User;
  currentLang: string;
  langs = [];

  constructor(
    private authService: AuthService,
    public langService: LangService,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.currentLang = this.langService.getCurrent();
  }

  setLanguage(langCode: string): void {
    this.langService.use(langCode);
    this.currentLang = this.langService.getCurrent();
  }

}
