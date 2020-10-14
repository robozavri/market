import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-activation-success',
  templateUrl: './email-activation-success.component.html',
  styleUrls: ['./email-activation-success.component.scss']
})
export class EmailActivationSuccessComponent implements AfterViewInit {

  constructor(
    private router: Router,
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.router.navigate(['/account']);
    }, 3000)
  }

}
