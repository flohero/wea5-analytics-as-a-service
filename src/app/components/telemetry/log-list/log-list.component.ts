import {Component, OnInit} from '@angular/core';
import {Log} from "../../../model/log";
import {LogService} from "../../../services/log.service";

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

  logs: Array<Log>;

  constructor(private logService: LogService) {
  }

  ngOnInit(): void {
    this.logService.findLogs()
      .subscribe(res => this.logs = res);
  }

}
