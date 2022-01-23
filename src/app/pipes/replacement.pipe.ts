import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'replacement'
})
export class ReplacementPipe implements PipeTransform {

  transform(value: string, replacement: string = '*'): string {
    return replacement.repeat(value.length)
  }

}
