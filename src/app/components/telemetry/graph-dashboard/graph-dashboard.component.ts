import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../services/storage.service";
import {MetricFilter} from "../../../model/metricFilter";

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
        name: '',
        names: ['agent.ping.roundtriptime'],
        count: 10,
        page: 0,
        type: ''
      },
      {
        from: null,
        to: null,
        names: ['agent.ping.count'],
        name: '',
        count: 10,
        page: 0,
        type: ''
      }
    )
  }

  addGraph(filter: MetricFilter) {
    filter.count = 100
    this.storageService.set(StorageService.METRIC_CHARTS, filter)
    this.charts = this.storageService.get<Array<MetricFilter>>(StorageService.METRIC_CHARTS) ?? []
  }

  showModal() {
    let modal  = document.getElementById('graph-modal')
    modal?.classList.remove('hidden')
  }

}
