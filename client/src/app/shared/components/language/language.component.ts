import { Component, OnInit } from '@angular/core';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  constructor(
    public langService: LangService
  ) { }

  ngOnInit(): void {
  }

  changeLanguage(langCode: string): void {
    this.langService.use(langCode);
  }

}
