import { Component, OnInit } from '@angular/core';
import { UserApiService } from 'src/app/shared/http/user-api.service';
import { hasError } from 'src/app/shared/utils/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  hasError = hasError;
  submitted: boolean;
  notFound = false;

  constructor(
    private fb: FormBuilder,
    private userApiService: UserApiService,
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  submit(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.userApiService.requestPasswordReset(this.form.value).subscribe(() => {
      },
        (e) => {
          if (e.status === 404) {
            this.submitted = false;
            this.notFound = true;
          }
        }
      )
    }
  }

}
