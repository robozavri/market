import { FormGroup, AbstractControl } from '@angular/forms';

export function hasError(form: FormGroup | AbstractControl, name: string, error: string | string[], submitted: boolean): boolean {
  const control = form.get(name);
  const errors = Array.isArray(error) ? error : [error];
  return errors.some((error: any) => {
    if (error) {
      return control.hasError(error) && (control.touched || submitted);
    } else {
      return control.errors && (control.touched || submitted);
    }
  });
}

export function hasErrorArrayElement(
  form: FormGroup | AbstractControl,
  name: any,
  error: string | string[],
  submitted: boolean,
  item: any
  ): boolean {

  const control = item.get(name);
  const errors = Array.isArray(error) ? error : [error];
  return errors.some((error: any) => {
    if (error) {
      return control.hasError(error) && (control.touched || submitted);
    } else {
      return control.errors && (control.touched || submitted);
    }
  });
}
