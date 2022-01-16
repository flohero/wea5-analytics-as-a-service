import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {Metric} from "../model/metric";
import {Relations} from "../model/relations";
import {MetricFilter} from "../model/metricFilter";
import {NameToValueMapping} from "../model/nameToValueMapping";

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  constructor(private client: HttpClient) {
  }

  findMetrics({names, count, page, from, to}: MetricFilter): Observable<Array<Metric>> {
    const namesParam = names?.map(name => `names=${name}`).join('&') ?? ''
    return this.client.get<any>(`${environment.url}/metrics?${namesParam}&from=${from ?? ''}&to=${to ?? ''}&count=${count}&page=${page}`)
      .pipe(map(res => res['items'].reverse()))
  }

  findDistinctNames(): Observable<Array<string>> {
    return this.client.get<Array<string>>(`${environment.url}/metrics/names`)
  }

  findRelationships(): Observable<Relations> {
    return this.client.get<any>(`${environment.url}/metrics/analytics/relations`);
  }

  public groupByName(data: Array<Metric>): NameToValueMapping {
    return data.reduce<NameToValueMapping>((rv, x) => {
      (rv[x.name] = rv[x.name] || []).push(x.value);
      return rv;
    }, {});
  }
}
