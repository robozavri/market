import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  public registerForm: FormGroup;

  constructor( public fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [''],
      // password: ['', Validators.required],
      // repeatPassword: ['', Validators.required],
      // recaptcha: ['', Validators.required],
    });
  }

  submit() {
    if (!this.registerForm.valid) {
      console.log(this.registerForm.controls);
      console.log('this.form', this.registerForm.value);
      alert();
    }
  }


}
