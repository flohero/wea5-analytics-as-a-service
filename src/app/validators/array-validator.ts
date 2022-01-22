import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function ArrayValidator(entries: Array<any>): ValidatorFn {
  return function (control: AbstractControl): ValidationErrors | null {
    return entries.includes(control.value) ? null : {'member': errorIfNotInArray(control.value, entries)}
  }
}

export function errorIfNotInArray(value: any, entries: Array<any>): string | null {
  return entries.includes(value) ? null : `"${value}" is not in defined range [${entries.join(', ')}]`
}
