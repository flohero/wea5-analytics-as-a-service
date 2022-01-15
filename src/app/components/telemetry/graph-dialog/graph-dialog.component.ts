import {Component, OnInit} from '@angular/core';
import {MetricFilter} from "../../../model/metricFilter";

@Component({
  selector: 'app-graph-dialog',
  templateUrl: './graph-dialog.component.html',
  styleUrls: ['./graph-dialog.component.css']
})
export class GraphDialogComponent implements OnInit {

  charts: Array<MetricFilter> = []

  constructor() { }

  ngOnInit(): void {
  }

  addGraph(filter: MetricFilter) {
    filter.count = 100
    this.charts[0] = filter
  }

}
