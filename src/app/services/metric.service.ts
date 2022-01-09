import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {Metric} from "../model/metric";
import {Relations} from "../model/relations";

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  constructor(private client: HttpClient) {
  }

  findMetrics(name: string, count: number = 100, page: number = 0, from: Date | null = null, to: Date | null = null): Observable<Array<Metric>> {
    return this.client.get<any>(`${environment.url}/metrics?names=${name ?? ''}&from=${from ?? ''}&to=${to ?? ''}&count=${count}&page=${page}`)
      .pipe(map(res => res['items']))
  }

  findRelationships(): Observable<Relations> {
    return this.client.get<any>(`${environment.url}/metrics/analytics/relations`);
  }
}
