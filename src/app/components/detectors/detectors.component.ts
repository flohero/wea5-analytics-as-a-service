import {Component, OnInit} from '@angular/core';
import {DetectorService} from '../../services/detector.service';
import {Detector} from '../../model/detector';
import {catchError, of, tap} from 'rxjs';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-detectors',
  templateUrl: './detectors.component.html',
  styleUrls: ['./detectors.component.css']
})
export class DetectorsComponent implements OnInit {

  detectors: Array<Detector> = []

  constructor(private detectorService: DetectorService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.loadDetectors();
  }

  isHeartbeatDetector(detector: Detector): boolean {
    return this.detectorService.isHeartbeatDetector(detector)
  }

  deleteDetector(detector: Detector) {
    this.detectorService.deleteDetector(detector)
      .pipe(
        tap(() => this.loadDetectors()),
        catchError(() => {
          this.toastService.sendError('Could not delete detector')
          return of(null)
        }))
      .subscribe(_ => {
        this.toastService.sendFine('Removed detector')
      })

  }

  loadDetectors() {
    this.detectorService.findAllDetectors()
      .subscribe(detectors => this.detectors = detectors)
  }

  addedDetectors(detector: Detector) {
    this.detectorService.createDetector(detector)
      .pipe(
        tap(() => this.loadDetectors()),
        catchError(() => {
          this.toastService.sendError('Could not create detector')
          return of(null)
        })
      )
      .subscribe(_ => {
          const modal = document.getElementById('add-detector-modal')
          modal?.classList.add('hidden')
          this.toastService.sendFine('Added detector')
        }
      )
  }

  updateDetector(detector: Detector) {
    this.detectorService.updateDetector(detector)
      .pipe(
        tap(() => this.loadDetectors()),
        catchError(() => {
          this.toastService.sendError('Could not update detector')
          return of(null)
        }))
      .subscribe(_ => {
          const modal = document.getElementById(`update-detector-modal-${detector.id}`)
          modal?.classList.add('hidden')
          this.toastService.sendFine('Updated detector')
        }
      )
  }

  toggleDetector(detector: Detector) {
    detector.activated = !detector.activated
    this.detectorService.updateDetector(detector)
      .pipe(tap(() => this.loadDetectors()))
      .subscribe()
  }

  showUpdateDetectorModal(detector: Detector) {
    const modal = document.getElementById(`update-detector-modal-${detector.id}`)
    modal?.classList.remove('hidden')
  }

  addDetector() {
    const modal = document.getElementById('add-detector-modal')
    modal?.classList.remove('hidden')
  }
}
