import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function timeSpanValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
   console.log(control.value)
    return {timespan: {value: control.value}};
  };
}
