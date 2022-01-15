import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {Metric} from "../model/metric";
import {Relations} from "../model/relations";
import {MetricFilter} from "../model/metricFilter";

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  constructor(private client: HttpClient) {
  }

  findMetrics({name, count, page, from, to} : MetricFilter): Observable<Array<Metric>> {
    return this.client.get<any>(`${environment.url}/metrics?names=${name ?? ''}&from=${from ?? ''}&to=${to ?? ''}&count=${count}&page=${page}`)
      .pipe(map(res => res['items']))
  }

  findRelationships(): Observable<Relations> {
    return this.client.get<any>(`${environment.url}/metrics/analytics/relations`);
  }
}
