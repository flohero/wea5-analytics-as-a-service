import {Pipe, PipeTransform} from '@angular/core';
import {displayTimespan, parseTimespan} from "../utils/timespan-util";

@Pipe({
  name: 'timespan'
})
export class TimespanPipe implements PipeTransform {

  transform(value: string): string {
    const timespan = parseTimespan(value)
    if (!timespan) {
      return 'Error parsing timespan'
    }
    return displayTimespan(timespan)
  }


}
