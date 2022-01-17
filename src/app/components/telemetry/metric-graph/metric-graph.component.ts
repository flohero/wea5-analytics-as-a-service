import {Component, Input, OnInit} from '@angular/core';
import {MetricService} from "../../../services/metric.service";
import {ChartConfiguration, ChartType} from "chart.js";
import {TelemetryFilter} from "../../../model/telemetryFilter";
import 'chartjs-adapter-moment'


@Component({
  selector: 'app-metric-graph',
  templateUrl: './metric-graph.component.html',
  styleUrls: ['./metric-graph.component.css']
})
export class MetricGraphComponent implements OnInit {

  @Input() metricFilter: TelemetryFilter
  chartOptions: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        type: 'time'
      },
      y: {
        position: 'left',
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
    }
  }

  chartType: ChartType = 'line'
  labels: Array<string> = [];
  legend = true;
  data: any = []

  constructor(private metricService: MetricService) {
  }

  ngOnInit() {
    this.metricService.findMetrics(this.metricFilter)
      .subscribe(metrics => {
        const grouped = this.metricService.groupByName(metrics)
        this.labels = metrics.map(metric => new Date(metric.createdAt).toISOString().substring(0, 19));
        this.data = []
        for (let key in grouped) {
          this.data.push({
            label: key,
            data: grouped[key]
          })
        }
      })
  }
}
