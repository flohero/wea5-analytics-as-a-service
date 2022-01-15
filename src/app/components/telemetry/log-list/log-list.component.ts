import {Component, OnInit} from '@angular/core';
import {Log} from "../../../model/log";
import {LogService} from "../../../services/log.service";
import {LogType} from "../../../model/logType";
import {MetricFilter} from "../../../model/metricFilter";
import {FilterRoutingService} from "../../../services/filter-routing.service";

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

  logs: Array<Log>;
  names: Array<string>
  logTypes = Object.values(LogType)
  filter: MetricFilter

  loading: boolean = true

  constructor(private logService: LogService,
              private filterRoutingService: FilterRoutingService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.filterRoutingService.routeToFilter()
      .subscribe(filter => {
        this.filter = filter
        this.applyFilter(this.filter)
        this.logService.findDistinctNames().subscribe(res => this.names = res)
        this.loading = false
      })
  }

  applyFilter(filter: MetricFilter | null) {
    this.loading = true
    this.filter = filter ?? this.filter

    this.logService.findLogs(
      this.filter.count,
      this.filter.page,
      this.filter.name ?? '',
      this.filter.type,
      this.filter.from,
      this.filter.to
    ).subscribe(res => this.logs = res);
    this.updateRoute()
    this.loading = false
  }

  nextPage() {
    console.log(this.filter)
    if (this.hasNextPage()) {
      this.filter.page++
      this.applyFilter(null)
    }
  }

  previousPage() {
    if (this.hasPreviousPage()) {
      this.filter.page--
      this.applyFilter(null)
    }
  }

  hasPreviousPage(): boolean {
    return this.filter.page != null && this.filter.page > 0;
  }

  hasNextPage(): boolean {
    return this.filter.count != null && this.logs?.length >= this.filter.count
  }

  private updateRoute() {
    this.filterRoutingService.filterToRoute(this.filter)
  }

}
