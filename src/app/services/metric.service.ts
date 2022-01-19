import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {Metric} from "../model/metric";
import {Relations} from "../model/relations";
import {TelemetryFilter} from "../model/telemetryFilter";
import {NameToValueMapping} from "../model/nameToValueMapping";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  constructor(private client: HttpClient,
              private storageService: StorageService) {
  }

  findMetrics({names, count, page, from, to, instance}: TelemetryFilter): Observable<Array<Metric>> {
    let params = new HttpParams()
    names.forEach(n => params = params.append('names', n))
    params = params.append('from', from?.toISOString() ?? '')
      .append('to', to?.toISOString() ?? '')
      .append('offset', page ?? 0)
      .append('count', count ?? 0)
      .append('instance', instance ?? '')

    return this.client.get<any>(`${environment.url}/metrics`, {params})
      .pipe(map(res => res['items']))
  }

  findDistinctNames(): Observable<Array<string>> {
    return this.client.get<Array<string>>(`${environment.url}/metrics/names`)
  }

  findRelationships(): Observable<Relations> {
    return this.client.get<any>(`${environment.url}/metrics/analytics/relations`);
  }

  public groupByName(data: Array<Metric>): NameToValueMapping {
    return data.reduce<NameToValueMapping>((rv, x) => {
      (rv[x.name] = rv[x.name] || []).push({ value: x.value, createdAt: x.createdAt });
      return rv;
    }, {});
  }

  findAllCharts(): Array<TelemetryFilter> {
    return this.storageService.get<Array<TelemetryFilter>>(StorageService.METRIC_CHARTS) ?? []
  }

  setAllCharts(charts: Array<TelemetryFilter>) {
    this.storageService.set<Array<TelemetryFilter>>(StorageService.METRIC_CHARTS, charts)
  }

  removeChart(id: number) {
    const charts = this.findAllCharts()
    charts.splice(id, 1)
    this.setAllCharts(charts)
  }

  addChart(chart: TelemetryFilter) {
    const charts = this.findAllCharts()
    charts.push(chart)
    this.setAllCharts(charts)
  }

}
