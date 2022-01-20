import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timespan'
})
export class TimespanPipe implements PipeTransform {

  transform(value: string): string {
    const daysEnd = value.indexOf('.')

    const time = value.substring(daysEnd + 1).split(':')
    let hours = parseInt(time[0])
    if(daysEnd > 0) {
      const days = parseInt(value.substring(0, daysEnd))
      hours += days * 24
    }
    return `${hours.toString().padStart(2, "0")}h ${time[1]}m ${time[2]}s`;
  }

}
