import {Component, OnInit} from '@angular/core';
import {MetricService} from "../../../../services/metric.service";
import {ChartType} from 'chart.js';


@Component({
  selector: 'app-relationship-graph',
  templateUrl: './relationship-graph.component.html',
  styleUrls: ['./relationship-graph.component.css']
})
export class RelationshipGraphComponent implements OnInit {

  options = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      x: {
        gridLines: {
          drawBorder: false,
          display: false
        },
        ticks: {
          minTicksLimit: 0,
          maxTicksLimit: 30,
        }
      },
      y: {
        ticks: {
          minTicksLimit: 0,
          maxTicksLimit: 30,
        }
      }
    }
  };
  chartType: ChartType = 'bubble'
  data: any


  constructor(private metricService: MetricService) {
  }

  ngOnInit(): void {
    this.metricService.findRelationships()
      .subscribe(relations => {

        this.data = [{
          data: relations.links.map(relation => {
            return {
              x: RelationshipGraphComponent.hashCode(relation.target),
              y: RelationshipGraphComponent.hashCode(relation.source),
              r: relation.value / 100
            }
          }),
          label: 'Metric Relations'
        }]
      })
  }

  private static hashCode(str: string) {
    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }


}
