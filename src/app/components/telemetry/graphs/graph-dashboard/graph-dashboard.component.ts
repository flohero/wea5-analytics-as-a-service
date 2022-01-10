import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../../services/storage.service";
import {MetricFilter} from "../../../../model/metricFilter";

@Component({
  selector: 'app-graph-dashboard',
  templateUrl: './graph-dashboard.component.html',
  styleUrls: ['./graph-dashboard.component.css']
})
export class GraphDashboardComponent implements OnInit {

  charts: Array<MetricFilter>

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.charts = this.storageService.get<Array<MetricFilter>>(StorageService.METRIC_CHARTS) ?? []
    this.charts.push(
      {
        from: null,
        to: null,
        name: 'agent.ping.roundtriptime',
        count: 10
      },
      {
        from: null,
        to: null,
        name: 'agent.ping.count',
        count: 10
      }
    )
  }

}
