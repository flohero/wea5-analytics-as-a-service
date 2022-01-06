import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {Log} from "../model/log";

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private client: HttpClient) {
  }

  private readonly count = `100`;

  private readonly page = `0`;

  findLogs(): Observable<Array<Log>> {
    return this.client.get<any>(`${environment.url}/logs?count=${this.count}&offset=${this.page}`)
      .pipe(map(res => res['items']));
  }
}
