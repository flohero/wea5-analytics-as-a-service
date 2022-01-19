import { Component, OnInit } from '@angular/core';
import {DetectorService} from "../../services/detector.service";
import {Detector} from "../../model/detector";

@Component({
  selector: 'app-detectors',
  templateUrl: './detectors.component.html',
  styleUrls: ['./detectors.component.css']
})
export class DetectorsComponent implements OnInit {

  detectors: Array<Detector> = []

  constructor(private detectorService: DetectorService) { }

  ngOnInit(): void {
    this.detectorService.findAllDetectors()
      .subscribe(detectors => this.detectors = detectors)
  }

}
