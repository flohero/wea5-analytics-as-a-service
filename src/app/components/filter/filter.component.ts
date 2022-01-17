import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {TelemetryFilter} from "../../model/telemetryFilter";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() telemetryNames: Array<string>
  @Input() types: Array<string>
  @Input() submitTitle: string = 'Filter'
  @Input() useSearch: boolean = true
  @Input() defaultFilter: TelemetryFilter
  @Output() filterEvent: EventEmitter<TelemetryFilter> = new EventEmitter<TelemetryFilter>()

  filterForm: FormGroup
  names: Array<string> = []

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filterForm = new FormGroup({
        name: new FormControl(params['name']),
        names: new FormControl(),
        type: new FormControl(params['type']),
        from: new FormControl(params['from']),
        to: new FormControl(params['to']),
      });
    })
  }

  submit() {
    const filterValues = this.filterForm.value;
    const metricFilter: TelemetryFilter = {
      name: filterValues.name,
      names: this.names,
      from: filterValues.from,
      to: filterValues.to,
      count: 100,
      type: filterValues.type,
      page: 0
    }
    this.filterEvent.emit(metricFilter)
  }

  addName() {
    const filterValues = this.filterForm.value;
    this.names.push(filterValues.names)
    this.filterForm.controls['names'].setValue('')
  }

  removeName(index: number) {
    this.names.splice(index, 1);
  }

  removeNameByBackspace() {
    this.filterForm.value['names'] == '' && this.removeName(this.names.length - 1,);
  }
}
