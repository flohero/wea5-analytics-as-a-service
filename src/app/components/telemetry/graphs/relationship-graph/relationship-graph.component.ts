import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-relationship-graph',
  templateUrl: './relationship-graph.component.html',
  styleUrls: ['./relationship-graph.component.css']
})
export class RelationshipGraphComponent implements OnInit {

  private svg: any

  constructor() {
  }

  ngOnInit(): void {
    this.createSvg()
  }

  createSvg() {
    this.svg = d3.select("figure#graph")
      .append("svg")
  }


}
