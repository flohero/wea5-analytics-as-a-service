import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";
import {ActionType} from "../model/action-type";

export const ActionValidator = function (control: AbstractControl): ValidationErrors | null {
  const type = control.value.type
  if (type == ActionType.Email) {
    return Validators.email(control.get('endpoint')!)
  }
  const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  return Validators.pattern(reg)(control.get('endpoint')!)
}
