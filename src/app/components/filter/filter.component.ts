import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MetricFilter} from "../../model/metricFilter";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() names: Array<string>
  @Input() types: Array<string>
  @Output() filterEvent: EventEmitter<MetricFilter> = new EventEmitter<MetricFilter>()


  filterForm: FormGroup

  loading: boolean = true


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filterForm = new FormGroup({
        name: new FormControl(params['name']),
        type: new FormControl(params['type']),
        from: new FormControl(params['from']),
        to: new FormControl(params['to']),
      });
    })
  }

  submit() {
    const filterValues = this.filterForm.value;
    const metricFilter: MetricFilter = {
      name: filterValues.name,
      from: filterValues.from,
      to: filterValues.to,
      count: 0,
      type: filterValues.type,
      page: 0
    }
    console.log(metricFilter)
    this.filterEvent.emit(metricFilter)
  }

}
