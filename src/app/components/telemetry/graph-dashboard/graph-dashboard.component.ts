import {Component, OnInit} from '@angular/core';
import {TelemetryFilter} from "../../../model/telemetry-filter";
import {MetricService} from "../../../services/metric.service";

@Component({
  selector: 'app-graph-dashboard',
  templateUrl: './graph-dashboard.component.html',
  styleUrls: ['./graph-dashboard.component.css']
})
export class GraphDashboardComponent implements OnInit {

  charts: Array<TelemetryFilter>
  private readonly graphModalId = 'graph-modal';

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

  removeGraph(id: number) {
    this.metricService.removeChart(id)
    this.charts = this.metricService.findAllCharts()
  }

  editGraph(id: number) {
    const chartId = `graph-details-${id}`
    const modal = document.getElementById(chartId)
    modal?.classList.remove('hidden')

  }

  updateGraph(filter: TelemetryFilter, id: number) {
    this.metricService.updateChartById(id, filter)
    this.charts = this.metricService.findAllCharts()
    const modal = document.getElementById(this.graphModalId)
    modal?.classList.add('hidden')
  }
}
