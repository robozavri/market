import { Injectable } from '@angular/core';
import { UserApiService } from '../http/user-api.service';
import { AbstractControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UniqueEmailValidator {

  constructor(private userApiService: UserApiService) { }

  validator(): any {
    return (control: AbstractControl) => {
      const email = control.value;
      if (!email) return of(null);
      return this.userApiService.emailExists(email)
        .pipe(
          map(() => null),
          catchError(() => of({ emailUnique: true }))
        );
    }
  }
}
