import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CategoryApiService } from 'src/app/shared/http/category-api.service';
import { FilterApiService } from 'src/app/shared/http/filter-api.service';
import { hasError } from 'src/app/shared/utils/form';
import { Category } from 'src/app/shared/models/category';
import { Filter } from 'src/app/shared/models/filter';
import { filters as commonFilters } from 'src/app/shared/constants/filters';
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

    get commonFilters() {
      return commonFilters;
    }


  form: FormGroup;
  hasError = hasError;
  step = 1;
  categories: any;
  filters: any;
  filteredCategoties: any;
  parentCategory: Category = null;
  choosedCategory: Category = null;
  displayCommonFilters = false;

  ngOnInit(): void {

    this.categoryApiService.getByQuery({ all: true }).subscribe((data) => {
      this.categories = data.items;
      this.filteredCategoties = this._filterCategriesGetGenerals();
    });

    this.form = this.fb.group({
      // phone: ['789456132', [Validators.required, Validators.pattern('[0-9]{9}')]],
      phone: ['789456132'],
      address: ['temporary address'],
      category: [null],
      price: [null],
      priceWithAgreement: ['priceWithAgreement', false],
      canOfferPrice: ['canOfferPrice', false],
      condType: ['condType'],
      adType: ['adType'],
    });

    _.forEach(this.commonFilters, (filterItem) => {
      this.form.addControl(filterItem.slug, new FormControl('', Validators.required));
    });
  }

  _filterCategriesGetGenerals(): any {
    return this.categories.filter((category: any) => category.parent === null);
  }


  filterByParentCategory(): void {
    this.displayCommonFilters = false;
    for (const [key, value] of Object.entries(this.form.controls)) {
      // დატოვებს საერთო ფილტრებს
      if (key === 'phone' || key === 'category'
      || _.find(this.commonFilters, (filter: any) => { return filter.slug === key; }) !== undefined ) {
         continue;
      }
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
      this.displayCommonFilters = true;
      this.filterApiService.getByQuery({ all: true, catId: cat.cat_id }).subscribe((data) => {
        this.filters = data.items;
        if (data.numTotal > 0) {
          _.forEach(this.filters, (filterItem: any) => {
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

  onChangeFilter($event: any, filterItem: Filter): void {
    const value = $event.target.value;
    if(filterItem.slug === 'priceWithAgreement' || filterItem.slug === 'canOfferPrice') {

      if ($event.target.checked) {
        this.form.get(filterItem.slug).setValue(true);
        // this.form.get('price').enable();
      } else{
        this.form.get(filterItem.slug).setValue(false);
        // this.form.get('price').disable();
      }
      return;
      // // this.form.get(filterItem.slug).setValue( !this.form.get(filterItem.slug).value );
      // if (this.form.get(filterItem.slug).value) {
      //   this.form.get('price').enable();
      //   return;
      // }
      // this.form.get('price').disable();
    }
    // if(filterItem.slug === 'priceWithAgreement' && value === 'on') {
    //   this.form.get('price').disable();
    //   this.form.get(filterItem.slug).setValue(true);
    //   return;
    // }
    // if(filterItem.slug === 'priceWithAgreement' && value !== 'on') {
    //   this.form.get('price').enable();
    //   this.form.get(filterItem.slug).setValue(false);
    //   return;
    // }
    this.form.get(filterItem.slug).setValue(value);
    console.log( this.form.get(filterItem.slug));
  }

  onChangeRadioFilter($event: any, filterItem: Filter): void {
    const value = $event.target.value;
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
