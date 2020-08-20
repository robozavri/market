import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { FormComponent } from 'app/shared/components/form.component';
import { Category } from 'app/shared/models/category';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material';

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
  @Input() amenities: any;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Category>();

  @ViewChild(MatMenuTrigger, { static: false }) ddTrigger: MatMenuTrigger;

  constructor(
    private fb: FormBuilder,
  ) {
    super();
    // this.filteredStates = this.stateCtrl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(state => state ? this._filterStates(state) : this.states.slice())
    //   );
    this.filteredCategoties = this._filterCategriesGetGenerals();
  }

  
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  // filteredCategoties: Observable<any>;
  filteredCategoties: any;
  form: FormGroup;
  parentCategory: any;
  choosedCategoryTitle = 'choose category';

  categories: any = [
    {
      _id: '5f37dcc11019cf191ca99c1a',
      parent: '5f37c27b3e607b0234e13995',
      name: 'chicken',
      title: {
        en: `chicken`,
        ge: `ქათამი`,
        ru: `курица`
    },
      ancestors: [
          {
              _id: '5f37c27b3e607b0234e13995',
              name: 'meat',
              slug: 'meat'
          }
      ],
      slug: 'chicken',
      __v: 0
  },
  {
      _id: '5f37c27b3e607b0234e13995',
      parent: null,
      name: 'meat',
      title: {
          en: `meat`,
          ge: `ხორცი`,
          ru: `мясо`
      },
      ancestors: [],
      slug: 'meat',
      __v: 0
  },
  {
      _id: '5f379a16cc98b4054000c47a',
      parent: null,
      name: 'Vegetables',
      title: {
        en: `vegetables`,
        ge: `ბოსტნეული`,
        ru: `Овощи`
    },
      ancestors: [],
      slug: 'vegetables',
      __v: 0
  }
  ];
  // states: State[] = [
  //   {
  //     name: 'Arkansas',
  //     population: '2.978M',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
  //     flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
  //   },
  //   {
  //     name: 'California',
  //     population: '39.14M',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
  //     flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
  //   },
  //   {
  //     name: 'Florida',
  //     population: '20.27M',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
  //     flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
  //   },
  //   {
  //     name: 'Texas',
  //     population: '27.47M',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
  //     flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
  //   }
  // ];




  // private _filterStates(value: string): State[] {
  //   const filterValue = value.toLowerCase();
  //   return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  // }

  private _filterCategriesGetGenerals(): any {
    return this.categories.filter((category: any) => category.parent === null);
  }
  
  filterByParentCategory(): any {
    if (this.parentCategory.parent === null) {
      this._filterCategriesGetGenerals();
      return;
    }
    // this.filteredCategoties = this.categories.filter((category: any) => category.parent === this.parentCategory._id);
  }

  filterByCategory(cat: any): any {
    const cats = this.categories.filter((category: any) => category.parent === cat._id);
    this.filteredCategoties = this.categories.filter((category: any) => category.parent === cat._id);
    if (  cats.length === 0 ) {
        this.filteredCategoties.push(cat);    
        this.form.get('parent').setValue(cat._id);
        this.choosedCategoryTitle = cat.name;
        this.parentCategory = this.categories.filter((category: any) => category._id === cat.parent);
        this.ddTrigger.closeMenu();
    }  
    if ( cat.parent !== null ) {
        this.parentCategory = this.categories.filter((category: any) => category._id === cat.parent)[0];
    } else {
        this.parentCategory = cat;
    }
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

  ngOnInit(): void {
    this.loadForm();

  }

  
  loadForm(): void {

    this.formData.title = this.formData.title || {};

    this.form = this.fb.group({
      parent: [''],
      name: [this.formData.name || '', Validators.required],
      title: this.fb.group({
        ge: [this.formData.title.ge || '', Validators.required],
        en: [this.formData.title.en || '', Validators.required],
        ru: [this.formData.title.ru || '', Validators.required],
      }),
    });

    // this.form.get('parent').valueChanges.subscribe(parent => {
    //     this.parent = parent;
    // });
  }
  
  cancelClick(ev: MouseEvent): void {
    ev.stopPropagation();
  }

  // image methods
  onUploadComplete(data: any, fieldName: string): void {
    this.form.get(fieldName).get('url').markAsTouched();
    this.form.get(fieldName).get('url').setValue(data.url);
  }
 
  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
