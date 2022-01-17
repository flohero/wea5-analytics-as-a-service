import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TelemetryFilter} from "../model/telemetryFilter";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilterRoutingService {

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  filterToRoute(filter: TelemetryFilter) {
    const queryParams = {
      'count': filter.count,
      'page': filter.page,
      'name': filter.name,
      'names': filter.names,
      'type': filter.type,
      'to': filter.to,
      'from': filter.from
    }
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams
      }
    )
  }

  routeToFilter(): Observable<TelemetryFilter> {
    return this.route.queryParams.pipe<TelemetryFilter>(map(params => {
      const filter: TelemetryFilter = {
        name: params['name'],
        names: params['names'],
        type: params['type'],
        from: params['from'],
        to: params['to'],
        page: parseInt(params['page'] ?? 0) ,
        count: parseInt(params['count']?? 100),
      }
      return filter
    }))
  }
}
