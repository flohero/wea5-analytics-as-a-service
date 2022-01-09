import {Component, OnInit} from '@angular/core';
import {MetricService} from "../../../../services/metric.service";


@Component({
  selector: 'app-metric-graph',
  templateUrl: './metric-graph.component.html',
  styleUrls: ['./metric-graph.component.css']
})
export class MetricGraphComponent implements OnInit {

  barChartOptions = {
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
  barChartLabels: Array<string> = [];
  barChartLegend = true;
  barChartData: any = []

  constructor(private metricService: MetricService) {
  }

  ngOnInit() {
    this.metricService.findMetrics('agent.ping.count')
      .subscribe(metrics => {
        this.barChartLabels = metrics.map(metric => new Date(metric.createdAt).toISOString().substring(0, 19));
        this.barChartData = [
          {
            data: metrics.map(metric => metric.value),
            label: 'agent.png.roundtriptime'
          }
        ]
      })
  }
}
