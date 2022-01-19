import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TelemetryFilter} from "../../../model/telemetryFilter";
import {MetricService} from "../../../services/metric.service";

@Component({
  selector: 'app-graph-dialog',
  templateUrl: './graph-dialog.component.html',
  styleUrls: ['./graph-dialog.component.css']
})
export class GraphDialogComponent implements OnInit {

  charts: Array<TelemetryFilter> = []
  names: Array<string> = []
  @Output() newGraphEvent = new EventEmitter<TelemetryFilter>();


  constructor(private metricService: MetricService) {
  }

  ngOnInit(): void {
    this.metricService.findDistinctNames().subscribe(names => {
      this.names = names;
    });
  }

  previewGraph(filter: TelemetryFilter) {
    this.charts[0] = filter
  }

  addGraph() {
    this.newGraphEvent.emit(this.charts[0])
  }

}
