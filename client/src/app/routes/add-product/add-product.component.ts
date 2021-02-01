import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CategoryApiService } from 'src/app/shared/http/category-api.service';
import { FilterApiService } from 'src/app/shared/http/filter-api.service';
import { hasError } from 'src/app/shared/utils/form';
import { Category } from 'src/app/shared/models/category';
import { Filter } from 'src/app/shared/models/filter';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private categoryApiService: CategoryApiService,
    private filterApiService: FilterApiService,
    ) { }

  form: FormGroup;
  hasError = hasError;
  step = 1;
  categories: any;
  filters: any;
  filteredCategoties: any;
  parentCategory: Category = null;
  choosedCategory: Category = null;

  ngOnInit(): void {

    this.categoryApiService.getByQuery({ all: true }).subscribe((data) => {
      this.categories = data.items;
      this.filteredCategoties = this._filterCategriesGetGenerals();
    });

    this.form = this.fb.group({
      // phone: ['789456132', [Validators.required, Validators.pattern('[0-9]{9}')]],
      phone: ['789456132'],
      address: ['dasfregtgfdg'],
      category: [null],
    });
    // if (!_.isEmpty(this.formData)) {
    //   this.choosedCategory = this.formData;
    //   if (this.formData.parent === null || this.formData.parent === '') {
    //     this.filteredCategoties = this._filterCategriesGetGenerals();
    //   } else {
    //     const cuurentParents = this.categories.filter((category: any) => category._id === this.formData.parent);
    //     const cuurentSiblings = this.categories.filter((category: any) => category.parent === this.formData.parent);
    //     this.parentCategory = cuurentParents[0];
    //     this.filteredCategoties = cuurentSiblings;
    //   }
    // }else{
    //   this.filteredCategoties = this._filterCategriesGetGenerals();
    // }
  }

  _filterCategriesGetGenerals(): any {
    return this.categories.filter((category: any) => category.parent === null);
  }


  filterByParentCategory(): void {

    for (const [key, value] of Object.entries(this.form.controls)) {
      if(key === 'phone' || key === 'category') continue;
      this.form.removeControl(key);
    }

    if (this.parentCategory === null || this.parentCategory.parent === null) {
      this.filteredCategoties = this._filterCategriesGetGenerals();
      this.parentCategory = null;
      return;
    }
    this.parentCategory = this.categories.filter((category: any) => category._id === this.parentCategory.parent)[0] || this.parentCategory;
    this.filteredCategoties = this.categories.filter((category: any) => category.parent === this.parentCategory._id);
    this.choosedCategory = this.parentCategory;
    this.filters = null;
  }

  filterByCategory(cat: Category): void {
    // წამოვიღოთ ამ კატეგორიის შვილები
    this.filteredCategoties = this.categories.filter((category: any) => category.parent === cat._id);
    if (this.filteredCategoties.length === 0) {
      this.form.get('category').setValue(cat.slug);
      this.filterApiService.getByQuery({ all: true, catId: cat.cat_id }).subscribe((data) => {
        this.filters = data.items;
        if (data.numTotal > 0) {
          _.forEach(this.filters, (filterItem) => {
            this.form.addControl(filterItem.slug, new FormControl('', Validators.required));
          });
        }
      });
      // call to api
    }

    this.form.get('category').setValue(cat.slug);
    this.choosedCategory = cat;
    this.parentCategory = cat;
  }

  filterByCategoryName(value: string): void {
    if ( value.length === 0 ) {
      this.filteredCategoties = this._filterCategriesGetGenerals();
      return;
    }

    const val = value.trim().toLowerCase();
    this.filteredCategoties = this.categories.filter((category: any) => {
      return (category.name.toLowerCase().indexOf(val) === 0 ||
      category.title.ge.toLowerCase().indexOf(val) === 0 ||
      category.title.en.toLowerCase().indexOf(val) === 0
      );
    });
  }

  // removeChoosedCategory(): void {
  //   this.choosedCategory = null;
  //   this.form.get('parent').setValue('');
  // }

  onChangeFilter(value: string, filterItem: Filter): void {
    console.log(value);
    this.form.get(filterItem.slug).setValue(value);
    console.log( this.form.get(filterItem.slug));
  }

  onChangeRadioFilter(value: string, filterItem: Filter): void {
    this.form.get(filterItem.slug).setValue(value);
  }

  onPreviusStep(): void {
    if (this.step > 1)
    this.step--;
  }

  onNextStep(): void {
    if (this.step < 4)
    this.step++
    if (this.step === 4) {
      this.form.addControl('phone', new FormControl('', Validators.required));
    }
  }


  onSubmit(): void {
    console.log('this.form', this.form);
    Object.keys(this.form.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
          }
      });
    // this.router.navigate(['/complete']);
  }

}
