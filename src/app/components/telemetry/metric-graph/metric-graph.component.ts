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
  labels: Array<Date> = [];
  legend = true;
  data: Array<any> = []

  constructor(private metricService: MetricService) {
  }

  ngOnInit() {
    console.log("Test", this.metricFilter.names)
    this.metricService.findMetrics(this.metricFilter)
      .subscribe(metrics => {
        const grouped = this.metricService.groupByName(metrics)
        console.log(grouped)
        this.labels = metrics.map(metric => (metric.createdAt))
        for (let key in grouped) {
          const dataset = grouped[key]
          const values: Array<number | null> = []
          for (const label of this.labels) {
            const datedValue = dataset.find(dv => {
              return (dv.createdAt) === label
            })
            values.push(datedValue?.value ?? null)
          }
          this.data.push({
            label: key,
            data: values
          })
        }
      })
  }
}
