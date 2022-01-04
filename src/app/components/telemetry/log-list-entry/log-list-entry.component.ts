import {Component, Input, OnInit} from '@angular/core';
import {Log, LogTypes} from "../../../model/log";

@Component({
  selector: 'tr[app-log-list-entry]',
  templateUrl: './log-list-entry.component.html',
  styleUrls: ['./log-list-entry.component.css']
})
export class LogListEntryComponent implements OnInit {

  @Input() log: Log;
  logType: string
  constructor() {
  }

  ngOnInit(): void {
    this.logType = LogTypes[this.log.type]
  }

}
