import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/shared/http/user-api.service';
import { hasError } from 'src/app/shared/utils/form';
import { UniqueEmailValidator } from 'src/app/shared/validators/unique-email.validator';

const passwordMatcher = (control: FormGroup) => {
  const newPassword = control.get('password');
  const confirmPassword = control.get('repeatPassword');
  if (newPassword.errors || confirmPassword.errors || newPassword.value === confirmPassword.value) {
    return false;
  } else {
    return { passwordMismatch: true }
  }
};

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})


export class AuthentificationComponent implements OnInit {

  registerForm: FormGroup;
  hasError = hasError;
  submitted: boolean;

  constructor(
    private fb: FormBuilder,
    private userApiService: UserApiService,
    private router: Router,
    private uniqueEmailValidator: UniqueEmailValidator,
    ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [null,
        [Validators.required, Validators.email],
        [this.uniqueEmailValidator.validator()]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
      ]],
      repeatPassword: ['', Validators.required],
      recaptcha: ['', Validators.required],
    }, { validators: passwordMatcher.bind(this) });
  }




  submit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      // this.userApiService.signUp(this.registerForm.value).subscribe(() => {
      //   this.registerForm.reset();
      //   console.log('SUCCESS');
      //   // this.router.navigate(['/user/email-activation']);
      // },() => {
      //   console.log('somthing want wrong');
      // });
      console.log('this.form', this.registerForm.value);
    }
  }

  handleSuccess(e: any) {
    // console.log('ReCaptcha', e);
  }
}


