import {Component, Input, OnInit} from '@angular/core';
import {MetricService} from "../../../../services/metric.service";
import {ChartType} from "chart.js";


@Component({
  selector: 'app-metric-graph',
  templateUrl: './metric-graph.component.html',
  styleUrls: ['./metric-graph.component.css']
})
export class MetricGraphComponent implements OnInit {

  @Input() metricName: string
  chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 20,
          autoSkip: true
        }
      }
    }
  };
  chartType: ChartType = 'line'
  labels: Array<string> = [];
  legend = true;
  data: any = []

  constructor(private metricService: MetricService) {
  }

  ngOnInit() {
    this.metricService.findMetrics(this.metricName, 10)
      .subscribe(metrics => {
        this.labels = metrics.map(metric => new Date(metric.createdAt).toISOString().substring(0, 19));
        this.data = [
          {
            data: metrics.map(metric => metric.value),
            label: this.metricName
          }
        ]
      })
  }
}
