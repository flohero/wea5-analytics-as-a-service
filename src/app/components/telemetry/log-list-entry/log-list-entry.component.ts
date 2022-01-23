import {Component, Input, OnInit} from '@angular/core';
import {Log} from "../../../model/log";

@Component({
  selector: 'div[app-log-list-entry]',
  templateUrl: './log-list-entry.component.html',
  styleUrls: ['./log-list-entry.component.css']
})
export class LogListEntryComponent implements OnInit {

  @Input() log: Log;

  constructor() {
  }

  ngOnInit(): void {
  }

}
