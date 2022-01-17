import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../services/storage.service";
import {TelemetryFilter} from "../../../model/telemetryFilter";

@Component({
  selector: 'app-graph-dashboard',
  templateUrl: './graph-dashboard.component.html',
  styleUrls: ['./graph-dashboard.component.css']
})
export class GraphDashboardComponent implements OnInit {

  private readonly graphModalId = 'graph-modal';
  charts: Array<TelemetryFilter>

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.charts = this.storageService.get<Array<TelemetryFilter>>(StorageService.METRIC_CHARTS) ?? []
  }

  loadGraphs(filters: TelemetryFilter) {
    this.charts.push(filters)
    this.storageService.set<Array<TelemetryFilter>>(StorageService.METRIC_CHARTS, this.charts)
    const modal  = document.getElementById(this.graphModalId)
    modal?.classList.add('hidden')
  }


  showModal() {
    const modal  = document.getElementById(this.graphModalId)
    modal?.classList.remove('hidden')
  }

  removeGraph(i: number) {
    this.charts.splice(i, 1)
    this.storageService.set<Array<TelemetryFilter>>(StorageService.METRIC_CHARTS, this.charts)
  }

  showGraph(i: number) {
    const modal  = document.getElementById(`graph-details-${i}`)
    modal?.classList.remove('hidden')
  }
}
