import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormComponent } from 'app/shared/components/form.component';
import { Category } from 'app/shared/models/category';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as _ from 'lodash';

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})

export class BasicInfoComponent extends FormComponent implements OnInit {

  
  @Input() formData: any;
  @Input() categories: any;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Category>();

  constructor(
    private fb: FormBuilder,
  ) {
    super();
    // this.filteredStates = this.stateCtrl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(state => state ? this._filterStates(state) : this.states.slice())
    //   );
  }

  filteredStates: Observable<State[]>;
  // filteredCategoties: Observable<any>;
  filteredCategoties: any;
  form: FormGroup;
  parentCategory: any = null;
  choosedCategory: any = null;

  _filterCategriesGetGenerals(): any {
    return this.categories.filter((category: any) => category.parent === null);
  }
  
  filterByParentCategory(): any {
    if (this.parentCategory === null || this.parentCategory.parent === null) {
      this.filteredCategoties = this._filterCategriesGetGenerals();
      this.parentCategory = null;
      return;
    }
    this.filteredCategoties = this.categories.filter((category: any) => category.parent === this.parentCategory._id);
    this.parentCategory = this.categories.filter((category: any) => category._id === this.parentCategory.parent)[0];
    this.choosedCategory = this.parentCategory;
  }

  filterByCategory(cat: any): any {
    // წამოვიღოთ ამ კატეგორიის შვილები
    this.filteredCategoties = this.categories.filter((category: any) => category.parent === cat._id);
    // შევინახოთ ეს კატეგორია
    this.form.get('parent').markAsTouched();
    this.form.get('parent').setValue(cat._id);
    this.choosedCategory = cat;
    this.parentCategory = cat;
  }

  filterByCategoryName(value: string): any {
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

  removeChoosedCategory(): void {
    this.choosedCategory = null;
    this.form.get('parent').setValue('');
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(): void {
    if (!_.isEmpty(this.formData)) {
      this.choosedCategory = this.formData;
      if (this.formData.parent === null || this.formData.parent === '') {
        this.filteredCategoties = this._filterCategriesGetGenerals();
      } else {
        const cuurentParents = this.categories.filter((category: any) => category._id === this.formData.parent);
        const cuurentSiblings = this.categories.filter((category: any) => category.parent === this.formData.parent);
        this.parentCategory = cuurentParents[0];
        this.filteredCategoties = cuurentSiblings;
      }
    }else{
      this.filteredCategoties = this._filterCategriesGetGenerals();
    }
  
    this.formData.title = this.formData.title || {};

    this.form = this.fb.group({
      parent: [this.formData.parent || ''],
      name: [this.formData.name || '', Validators.required],
      title: this.fb.group({
        ge: [this.formData.title.ge || '', Validators.required],
        en: [this.formData.title.en || '', Validators.required],
        ru: [this.formData.title.ru || '', Validators.required],
      }),
      isPublic: [this.formData.isPublic ],
    });

    // this.form.get('parent').valueChanges.subscribe(parent => {
    //     this.parent = parent;
    // });
  }
  
  // image methods
  // onUploadComplete(data: any, fieldName: string): void {
  //   this.form.get(fieldName).get('url').markAsTouched();
  //   this.form.get(fieldName).get('url').setValue(data.url);
  // }
 
  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
