import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Filter } from 'app/shared/models/filter';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
            

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent extends _FormComponent implements OnInit {

  @Input() formData: Filter;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Filter>();


  form: FormGroup;
  filterTypes = ['radio', 'checkbox', 'select'];
  
  
  public images = [];
  public items: FormArray;
    

  constructor(
    private fb: FormBuilder,
    
  ) {
    super();
  }

  ngOnInit(): void {

    this.formData.title = this.formData.title || {};
    const filterObj = { title: { ge: '', en: '', ru: '' } };
    const filtersArray = (this.formData.values || [filterObj]).map((item: any) => this.createFilters(item));
    
    this.form = this.fb.group({
        title: this.fb.group({                
            en: [this.formData.title.en || ''],
            ge: [this.formData.title.ge || ''],
            ru: [this.formData.title.ru || ''],
        }),
        values: this.fb.array( filtersArray ),
        slug: [this.formData.slug || ''],
        filterType: [this.formData.filterType || ''],
        isPublic: [this.formData.isPublic ],
    });
    
  }

  get filters(): FormArray {
      return this.form.get('values') as FormArray;
  }

  
  // values methods
  createFilters(data: any): FormGroup {
      return this.fb.group({
        title: this.fb.group({
            en: [data.en || ''],
            ge: [data.ge || ''],
            ru: [data.ru || ''],
        }),
      });
  }
  
  addFilter(details: string): void {
      const detailsForm = this.fb.group({
            title: this.fb.group({
              en: [''],
              ge: [''],
              ru: [''],
          }),
      });
      this[details].push(detailsForm);
  }

  deleteFilter(i: any): void{
      this.filters.removeAt(i);
  }

  

  

  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
