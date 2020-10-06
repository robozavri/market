import { Component, OnInit } from '@angular/core';
import { CategoryApiService } from 'src/app/shared/http/category-api.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  categories: Category[];

  constructor(
    private categoryApiService: CategoryApiService
  ) { }

  ngOnInit(): void {
    this.categoryApiService.getByQuery({ parent: null, all: true}).subscribe((data: any) => {
        this.categories = data.items;
    });

  }

}
