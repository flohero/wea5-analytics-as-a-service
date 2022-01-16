import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../services/storage.service";
import {MetricFilter} from "../../../model/metricFilter";

@Component({
  selector: 'app-graph-dashboard',
  templateUrl: './graph-dashboard.component.html',
  styleUrls: ['./graph-dashboard.component.css']
})
export class GraphDashboardComponent implements OnInit {

  private readonly graphModalId = 'graph-modal';
  charts: Array<MetricFilter>

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.charts = this.storageService.get<Array<MetricFilter>>(StorageService.METRIC_CHARTS) ?? []
  }

  loadGraphs(filters: MetricFilter) {
    this.charts.push(filters)
    this.storageService.set<Array<MetricFilter>>(StorageService.METRIC_CHARTS, this.charts)
    const modal  = document.getElementById(this.graphModalId)
    modal?.classList.add('hidden')
  }


  showModal() {
    const modal  = document.getElementById(this.graphModalId)
    modal?.classList.remove('hidden')
  }

  removeGraph(i: number) {
    this.charts.splice(i, 1)
    this.storageService.set<Array<MetricFilter>>(StorageService.METRIC_CHARTS, this.charts)
  }

  showGraph(i: number) {
    const modal  = document.getElementById(`graph-details-${i}`)
    modal?.classList.remove('hidden')
  }
}
