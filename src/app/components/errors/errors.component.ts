import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'div[app-errors]',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  @Input() errors: Array<string> = []

  constructor() {
  }

  ngOnInit(): void {
  }

}
