import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lite-header',
  templateUrl: './lite-header.component.html',
  styleUrls: ['./lite-header.component.scss']
})
export class LiteHeaderComponent implements OnInit {

  constructor(public router: Router ) { }

  ngOnInit(): void {
  }

}
