import {Component, OnInit} from '@angular/core';
import {TelemetryFilter} from "../../../model/telemetryFilter";
import {MetricService} from "../../../services/metric.service";

@Component({
  selector: 'app-graph-dashboard',
  templateUrl: './graph-dashboard.component.html',
  styleUrls: ['./graph-dashboard.component.css']
})
export class GraphDashboardComponent implements OnInit {

  private readonly graphModalId = 'graph-modal';
  charts: Array<TelemetryFilter>

  constructor(private metricService: MetricService) {
  }

  ngOnInit(): void {
    this.charts = this.metricService.findAllCharts()
  }

  addGraph(filter: TelemetryFilter) {
    this.metricService.addChart(filter)
    this.charts = this.metricService.findAllCharts()
    const modal = document.getElementById(this.graphModalId)
    modal?.classList.add('hidden')
  }

  showModal() {
    const modal = document.getElementById(this.graphModalId)
    modal?.classList.remove('hidden')
  }

  removeGraph(i: number) {
    this.metricService.removeChart(i)
    this.charts = this.metricService.findAllCharts()
  }

  showGraph(i: number) {
    const modal = document.getElementById(`graph-details-${i}`)
    modal?.classList.remove('hidden')
  }
}
