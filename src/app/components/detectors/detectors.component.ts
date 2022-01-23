import {Component, OnInit} from '@angular/core';
import {DetectorService} from "../../services/detector.service";
import {Detector} from "../../model/detector";

@Component({
  selector: 'app-detectors',
  templateUrl: './detectors.component.html',
  styleUrls: ['./detectors.component.css']
})
export class DetectorsComponent implements OnInit {

  detectors: Array<Detector> = []

  constructor(private detectorService: DetectorService) {
  }

  ngOnInit(): void {
    this.loadDetectors();
  }

  isHeartbeatDetector(detector: Detector): boolean {
    return this.detectorService.isHeartbeatDetector(detector)
  }

  deleteDetector(detector: Detector) {
    this.detectorService.deleteDetector(detector)
      .subscribe(_ => {
        this.loadDetectors()
      })

  }

  loadDetectors() {
    this.detectorService.findAllDetectors()
      .subscribe(detectors => this.detectors = detectors)
  }

  addedDetectors(detector: Detector) {
    this.detectorService.createDetector(detector)
      .subscribe(_ => {
          this.loadDetectors()
          const modal = document.getElementById('add-detector-modal')
          modal?.classList.add('hidden')
        }
      )
  }

  updateDetector(detector: Detector) {
    this.detectorService.updateDetector(detector)
      .subscribe(_ => {
          this.loadDetectors()
          const modal = document.getElementById(`update-detector-modal-${detector.id}`)
          modal?.classList.add('hidden')
        }
      )
  }

  toggleDetector(detector: Detector) {
    detector.activated = !detector.activated
    this.detectorService.updateDetector(detector)
      .subscribe(_ => {
          this.loadDetectors()
        }
      )
  }

  showUpdateDetectorModal(detector: Detector) {
    const modal = document.getElementById(`update-detector-modal-${detector.id}`)
    modal?.classList.remove('hidden')
  }
}
