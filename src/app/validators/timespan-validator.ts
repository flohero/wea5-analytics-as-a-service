import {AbstractControl, ValidationErrors} from "@angular/forms";

export const timeSpanValidator = (control: AbstractControl): ValidationErrors | null => {
  const hour = parseInt(control.get('hours')?.value)
  const minutes = parseInt(control.get('minutes')?.value)
  const seconds = parseInt(control.get('seconds')?.value)
  if(!(hour || minutes || seconds)) {
    return {'timespan': 'At least hours, minutes or seconds is required and have to be numbers'}
  }
  if(hour + minutes + seconds <= 0) {
    return {'timespan': 'Values have to be greater zero'}
  }
  return hour < 0 || minutes < 0 || seconds < 0 ? {'timespan': 'All values have to be positive'} : null
}
