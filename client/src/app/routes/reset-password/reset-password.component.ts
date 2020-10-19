import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from 'src/app/shared/http/user-api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { hasError } from 'src/app/shared/utils/form';

const passwordMatcher = (control: FormGroup) => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('repeatPassword');
  if (newPassword.errors || confirmPassword.errors || newPassword.value === confirmPassword.value) {
    return false;
  } else {
    return { passwordMismatch: true }
  }
};

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  submitted: boolean;
  email: string;
  token: string;
  hasError = hasError;

  constructor(
    private fb: FormBuilder,
    private userApiService: UserApiService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    if (!this.route.snapshot.queryParams.email || !this.route.snapshot.queryParams.token) {
        this.router.navigate(['/authentification']);
    }

    this.email = this.route.snapshot.queryParams.email;
    this.token = this.route.snapshot.queryParams.token;

    this.form = this.fb.group({
      newPassword: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(32),
      ]],
      repeatPassword: [null, [
        Validators.required,
      ]],
    }, { validators: passwordMatcher.bind(this) })
  }

  submit() {
    this.submitted = true;
    // console.log({ email: this.email, token: this.token, ...this.form.value });
    // return;
    this.userApiService.resetPassword({ email: this.email, token: this.token, ...this.form.value }).subscribe(
      () => {
        this.userApiService.signIn({ email: this.email, password: this.form.value.newPassword }).subscribe(
          ({ user, token }) => {
            this.authService.setToken(token);
            this.authService.changeUser(user);
            this.submitted = false;
            this.router.navigate(['/account']);
          },
          (e) => {
            console.log('login error');
          },
        );
      },
      () => {
        this.router.navigate(['/authentification']);
      },
    )
    this.submitted = false;
  }

}
