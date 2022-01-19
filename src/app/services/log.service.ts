import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {Log} from "../model/log";
import {TelemetryFilter} from "../model/telemetryFilter";

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private client: HttpClient) {
  }

  findLogs({count, page, searchText, type, from, to, instance}: TelemetryFilter): Observable<Array<Log>> {
    return this.client.get<any>(`${environment.url}/logs?
count=${count}
&offset=${page}
&searchText=${searchText}
&type=${type ?? ''}
&from=${from ?? ''}
&to=${to ?? ''}
&instanceId=${instance}`
    ).pipe(map(res => res['items']));
  }

  findDistinctNames(): Observable<Array<string>> {
    return this.client.get<Array<string>>(`${environment.url}/logs/names`)
  }
}
