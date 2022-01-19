import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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
  @Input() showCount: boolean;

  @Input() defaultFilter: TelemetryFilter = {
    count: 100,
    from: null,
    names: [],
    page: 0,
    searchText: '',
    to: null,
    type: '',
    instance: ''
  }
  @Output() filterEvent: EventEmitter<TelemetryFilter> = new EventEmitter<TelemetryFilter>()

  filterForm: FormGroup
  names: Array<string> = []
  instances: Array<string> = []

  constructor() {
  }

  ngOnInit(): void {
    this.names = this.defaultFilter.names
    this.filterForm = new FormGroup({
      name: new FormControl(this.defaultFilter.searchText),
      names: new FormControl(),
      type: new FormControl(this.defaultFilter.type),
      from: new FormControl(this.defaultFilter.from),
      to: new FormControl(this.defaultFilter.to),
      instance: new FormControl(this.defaultFilter.instance),
      count: new FormControl(this.defaultFilter.count)
    });

  }

  submit() {
    const filterValues = this.filterForm.value;
    const metricFilter: TelemetryFilter = {
      searchText: filterValues.name,
      names: this.names,
      from: filterValues.from,
      to: filterValues.to,
      count: filterValues.count,
      type: filterValues.type,
      page: 0,
      instance: filterValues.instance
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
