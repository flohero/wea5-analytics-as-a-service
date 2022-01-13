import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {Log} from "../model/log";
import {LogType} from "../model/logType";

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private client: HttpClient) {
  }

  findLogs(logCount: number,
           page: number,
           name: string,
           logType: LogType | string | null,
           from: Date | null,
           to: Date | null
  ): Observable<Array<Log>> {
    return this.client.get<any>(`${environment.url}/logs?
count=${logCount}
&offset=${page}
&searchText=${name}
&type=${logType ?? ''}
&from=${from ?? ''}
&to=${to ?? ''}`
    ).pipe(map(res => res['items']));
  }

  findDistinctNames(): Observable<Array<string>> {
    return this.client.get<Array<string>>(`${environment.url}/logs/names`)
  }
}
