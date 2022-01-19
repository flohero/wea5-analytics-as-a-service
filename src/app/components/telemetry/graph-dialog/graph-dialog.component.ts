import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TelemetryFilter} from "../../../model/telemetryFilter";
import {MetricService} from "../../../services/metric.service";
import {MetricType} from "../../../model/metricType";

@Component({
  selector: 'app-graph-dialog',
  templateUrl: './graph-dialog.component.html',
  styleUrls: ['./graph-dialog.component.css']
})
export class GraphDialogComponent implements OnInit {

  charts: Array<TelemetryFilter> = []
  names: Array<string> = []
  @Output() newGraphEvent = new EventEmitter<TelemetryFilter>();
  @Input() defaultChart: TelemetryFilter
  @Input() addButtonText: string;
  types: Array<string> = Object.values(MetricType)


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
