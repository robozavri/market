import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CategoryApiService } from 'src/app/shared/http/category-api.service';
import { FilterApiService } from 'src/app/shared/http/filter-api.service';
import { hasError } from 'src/app/shared/utils/form';
import { Category } from 'src/app/shared/models/category';
import { Filter } from 'src/app/shared/models/filter';
import { filters as commonFilters } from 'src/app/shared/constants/filters';
import * as _ from 'lodash';
import { CityApiService } from 'src/app/shared/http/city-api.service';
import { mediumSize } from 'src/app/shared/constants/image';
import { ProductApiService } from 'src/app/shared/http/product-api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  imageSize = mediumSize;
  cities: any;
  form: FormGroup;
  hasError = hasError;
  step = 1;
  categories: any;
  filters: any;
  filteredCategoties: any;
  parentCategory: Category = null;
  choosedCategory: Category = null;
  displayCommonFilters = false;
  priceWithAgreement = false;
  images = [];
  items: FormArray;

  constructor(
    private fb: FormBuilder,
    private categoryApiService: CategoryApiService,
    private filterApiService: FilterApiService,
    private cityApiService: CityApiService,
    private productApiService: ProductApiService,
    ) { }

  get commonFilters() {
    return commonFilters;
  }

  ngOnInit(): void {
    this.categoryApiService.getByQuery({ all: true }).subscribe((data) => {
      this.categories = data.items;
      this.filteredCategoties = this._filterCategriesGetGenerals();
    });

    this.cityApiService.getByQuery({ all: true}).subscribe((data: any) => {
        this.cities = data.items;
    });

    this.form = this.fb.group({
      phone: ['789456132'],
      address: ['temporary address'],
      category: [null, [Validators.required]],
      price: [0],
      priceWithAgreement: [false],
      canOfferPrice: [false],
      condType: ['', [Validators.required]],
      adType: ['', [Validators.required]],
      title: [''],
      description: [''],
      city: [''],
      youtubeUrl: [''],
      images: this.fb.array([]),
    });

    _.forEach(this.commonFilters, (filterItem: any) => {
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
      if (key === 'phone' || key === 'category' || key === 'title' || key === 'description' || key === 'city'
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
    this.form.get('category').setValue(null);
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

    // this.form.get('category').setValue(cat.slug);
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
    if(filterItem.slug === 'priceWithAgreement') {
      if ($event.target.checked) {
        this.form.get(filterItem.slug).setValue(true);
        this.priceWithAgreement = true;
      } else{
        this.form.get(filterItem.slug).setValue(false);
        this.priceWithAgreement = false;
      }
      return;
    }
    this.form.get(filterItem.slug).setValue(value);
  }

  onChangeRadioFilter($event: any, filterItem: Filter): void {
    const value = $event.target.value;
    this.form.get(filterItem.slug).setValue(value);
  }

  onPreviusStep(): void {
    if (this.step > 1) {
      this.step--;
    }

    if (this.step === 1) {
      this.form.get('title').clearValidators();
      this.form.get('description').clearValidators();
      this.form.get('city').clearValidators();
      this.form.get('youtubeUrl').clearValidators();

      this.form.get('title').updateValueAndValidity();
      this.form.get('description').updateValueAndValidity();
      this.form.get('city').updateValueAndValidity();
      this.form.get('youtubeUrl').updateValueAndValidity();
    }
  }

  createItemImages(url= ''): FormGroup {
    return this.fb.group({
        url,
    });
  }

   // images upload methods
   deleteImageImages(index: any): void {
    this.images.splice(index, 1);
    this.items = this.form.get('images') as FormArray;
    this.items.removeAt(index);
  }

  onUploadCompleteImages(data: any): void {

    this.items = this.form.get('images') as FormArray;
    data.map((image: any) => {
      this.items.push(this.createItemImages(image));
      this.images.push(image);
    });
  }

  onNextStep(): void {

    if (this.step === 1) {
      this.form.get('title').setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(200)]);
      this.form.get('description').setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(300)]);
      this.form.get('city').setValidators([Validators.required]);
      // this.form.get('youtubeUrl').setValidators([
      //   // Validators.pattern('^http:\/\/(?:www\.)?youtube.com\/watch\?v=\w+(&\S*)?$')
      // ]);

      this.form.get('title').updateValueAndValidity();
      this.form.get('description').updateValueAndValidity();
      this.form.get('city').updateValueAndValidity();
      // this.form.get('youtubeUrl').updateValueAndValidity();
    }

    if (this.step === 3) {
      this.form.get('phone').setValidators([
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(9), Validators.maxLength(9)]);
      this.form.get('phone').updateValueAndValidity();
      if (this.form.valid) {
        this.onSubmit();
      }
    }

    if (this.step < 3) {
      this.step++
    }

  }

  checkHasError(name: string, error: string | string[], step: number): boolean {
    if (step === this.step) {
      return hasError(this.form, name, error, true);
    }
    return hasError(this.form, name, error, false);
  }

  onSubmit(): void {
    console.log('this.form', {...this.form.value, category: this.choosedCategory._id, categorySlag: this.choosedCategory.slug} );
    this.productApiService.create({...this.form.value, category: this.choosedCategory._id, categorySlag: this.choosedCategory.slug}).subscribe(() => {});
    // return;
    // Object.keys(this.form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.form.get(key).errors;
    //   if (controlErrors != null) {
    //         Object.keys(controlErrors).forEach(keyError => {
    //           console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
    //         });
    //       }
    // });
    // this.router.navigate(['/complete']);
  }

}
