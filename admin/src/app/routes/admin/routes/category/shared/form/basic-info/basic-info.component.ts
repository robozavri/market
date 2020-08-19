import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormComponent } from 'app/shared/components/form.component';
import { Category } from 'app/shared/models/category';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})

export class BasicInfoComponent extends FormComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }
  @Input() formData: any;
  @Input() amenities: any;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Category>();

  serviceType: string;

  form: FormGroup;

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(): void {

    this.formData.title = this.formData.title || {};

    this.form = this.fb.group({
      name: [this.formData.name || '', Validators.required],
      title: this.fb.group({
        ge: [this.formData.title.ge || '', Validators.required],
        en: [this.formData.title.en || '', Validators.required],
        ru: [this.formData.title.ru || '', Validators.required],
      }),
    });

    // this.form.get('serviceType').valueChanges.subscribe(serviceType => {
    //     this.serviceType = serviceType;
    // });
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
