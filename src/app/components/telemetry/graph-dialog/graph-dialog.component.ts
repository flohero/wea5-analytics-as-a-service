import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MetricFilter} from "../../../model/metricFilter";
import {MetricService} from "../../../services/metric.service";

@Component({
  selector: 'app-graph-dialog',
  templateUrl: './graph-dialog.component.html',
  styleUrls: ['./graph-dialog.component.css']
})
export class GraphDialogComponent implements OnInit {

  charts: Array<MetricFilter> = []
  names: Array<string> = []
  @Output() newGraphEvent = new EventEmitter<MetricFilter>();


  constructor(private metricService: MetricService) {
  }

  ngOnInit(): void {
    console.log(this.newGraphEvent)
    this.metricService.findDistinctNames().subscribe(names => {
      this.names = names;
    });
  }

  previewGraph(filter: MetricFilter) {
    filter.count = 100
    this.charts[0] = filter
  }

  addGraph() {
    this.newGraphEvent.emit(this.charts[0])
  }

}
