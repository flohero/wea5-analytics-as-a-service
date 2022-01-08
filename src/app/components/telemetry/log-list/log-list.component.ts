import {Component, OnInit} from '@angular/core';
import {Log} from "../../../model/log";
import {LogService} from "../../../services/log.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LogType} from "../../../model/logType";

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

  logs: Array<Log>;
  names: Array<string>
  filterForm: FormGroup
  logTypes = LogType

  page: number = 0
  loading: boolean = true
  logCount: number

  constructor(private logService: LogService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loading = true
    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params['page'] ?? 0)
      this.logCount = parseInt(params['logCount'] ?? 25)
      this.filterForm = new FormGroup({
        name: new FormControl(params['name']),
        logType: new FormControl(params['logType']),
        from: new FormControl(params['from']),
        to: new FormControl(params['to']),
      });
    })
    this.applyFilter(false)
    this.logService.findDistinctNames().subscribe(res => this.names = res)
    this.loading = false
  }

  applyFilter(resetPage: boolean = false) {
    this.loading = true
    if (resetPage) {
      this.page = 0
    }
    const filterValues = this.filterForm.value;
    this.logService.findLogs(
      this.logCount,
      this.page ?? 0,
      filterValues.name ?? '',
      filterValues.logType,
      filterValues.from,
      filterValues.to
    ).subscribe(res => this.logs = res);
    this.updateRoute()
    this.loading = false
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.page++
      this.applyFilter(false)
      this.updateRoute()
    }
  }

  previousPage() {
    if (this.hasPreviousPage()) {
      this.page--
      this.applyFilter(false)
      this.updateRoute()
    }
  }

  hasPreviousPage(): boolean {
    return this.page > 0;
  }

  hasNextPage(): boolean {
    return this.logs?.length >= this.logCount
  }

  private updateRoute() {
    const filterValues = this.filterForm.value;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          'logCount': this.logCount,
          'page': this.page,
          'name': filterValues.name,
          'logType': filterValues.logType,
          'from': filterValues.from,
          'to': filterValues.to,
        }
      }
    )
  }

}
