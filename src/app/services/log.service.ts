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

  findLogs(logCount: number = 100, page: number = 0, name: string = ''): Observable<Array<Log>> {
    return this.client.get<any>(`${environment.url}/logs?count=${logCount}&offset=${page}&searchText=${name}`)
      .pipe(map(res => res['items']));
  }
}
