import {Injectable} from '@angular/core';
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor() {
  }

  public writeText(textToCopy: string): Observable<any> {
    return from(navigator.clipboard.writeText(textToCopy))
  }

}
