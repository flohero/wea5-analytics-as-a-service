import {Component, OnInit} from '@angular/core';
import {Log} from "../../../model/log";
import {LogService} from "../../../services/log.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

  logs: Array<Log>;
  filterForm: FormGroup
  loading: boolean = true

  page: number = 0
  private readonly defaultLogCount = 25


  constructor(private logService: LogService,
              private router: Router,
              private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.loading = true
    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params['page'])
      this.filterForm = new FormGroup({
        logCount: new FormControl(params['logCount'] ?? this.defaultLogCount),
        name: new FormControl(params['name']),
      });
    })
    this.applyFilter(false)
    this.loading = false
  }

  applyFilter(resetPage: boolean = false) {
    this.loading = true
    if(resetPage) {
      this.page = 0
    }
    const filterValues = this.filterForm.value;
    this.logService.findLogs(filterValues.logCount ?? 100, this.page ?? 0, filterValues.name ?? '')
      .subscribe(res => this.logs = res);
    this.updateRoute()
    this.loading = false
  }

  nextPage() {
    if(this.hasNextPage()) {
      this.page++
      this.applyFilter(false)
      this.updateRoute()
    }
  }

  previousPage() {
    if(this.hasPreviousPage()) {
      this.page--
      this.applyFilter(false)
      this.updateRoute()
    }
  }

  hasPreviousPage() {
    return this.page > 0;
  }

  hasNextPage(): boolean {
    return this.logs?.length >= this.filterForm.value.logCount
  }

  private updateRoute() {
    const filterValues = this.filterForm.value;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          'logCount': filterValues.logCount,
          'page': this.page,
          'name': filterValues.name
        }
      }
    )
  }

}
