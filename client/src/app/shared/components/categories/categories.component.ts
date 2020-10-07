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
  categories2: Category[];
  showSubmCategory = -1;

  constructor(
    private categoryApiService: CategoryApiService
  ) { }

  ngOnInit(): void {
    this.categoryApiService.getByQuery({
      populate: 'descendents',
      // parent: null,
      all: true
    }).subscribe((data: any) => {
        this.categories = data.items;
        this.categories2 = data.items;
        // console.log(_.filter(this.categories, { parent: null }))
        // console.log(data.items)
    });
  }

  mouseEnterCategoyItem($event: any, i: any) {
    // console.log('ENTER $event', $event)
    // console.log('ENTER $event', i)
  //   if ($(this) instanceof $){
  //     console.log('object is jQuery');
  // }
    this.showSubmCategory = i;
  }

  mouseLeaveCategoyItem($event: any, i: any) {
    // console.log('LEAVE $event', $event)
    this.showSubmCategory = -1;
    // console.log('ENTER $event', i)
  }

  filterBy(value: string) {
    // console.log('filterBy value', value)
    return  this.categories.filter(item => item.parent === value);
  }
}
