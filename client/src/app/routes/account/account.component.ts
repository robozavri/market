import { Component, OnInit } from '@angular/core';
import { ProductApiService } from 'src/app/shared/http/product-api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  myProducts: any;

  constructor(
    private productApiService: ProductApiService,
  ) { }

  ngOnInit(): void {
    this.productApiService.getMyProducts({}).subscribe((data) => {
        this.myProducts = data.items;
    });
  }

}
