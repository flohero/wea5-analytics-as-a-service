import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Detector} from '../../model/detector';
import {ActionType} from "../../model/action-type";
import {CompareType} from "../../model/compare-type";
import {AggregateOperation} from "../../model/aggregate-operation";
import {timeSpanValidator} from "../../validators/timespan-validator";

@Component({
  selector: 'app-detector-dialog',
  templateUrl: './detector-dialog.component.html',
  styleUrls: ['./detector-dialog.component.css']
})
export class DetectorDialogComponent implements OnInit {

  detectorForm: FormGroup
  @Input() detector: Detector = {
    id: 0,
    activated: false,
    interval: '',
    lastExecuted: null,
    metricName: 'Test',
    offset: '',
    action: {
      type: '',
      endpoint: ''
    }
  }

  actionTypes: Array<string> = Object.keys(ActionType)
  compareType: Array<string> = Object.keys(CompareType)
  aggregateOperations: Array<string> = Object.keys(AggregateOperation)

  constructor() {
  }

  ngOnInit(): void {
    this.detectorForm = new FormGroup({
      name: new FormControl(this.detector.metricName, [Validators.required]),
      interval: new FormGroup({
        hours: new FormControl(),
        minutes: new FormControl(),
        seconds: new FormControl()
      }),
      offset: new FormGroup({
        hours: new FormControl(),
        minutes: new FormControl(),
        seconds: new FormControl()
      }, [timeSpanValidator]),

      activated: new FormControl(this.detector.activated),
      detectorType: new FormControl(this.detector.intervalDetector ? 'interval' : 'minmax', [Validators.required]),
      intervalDetector: new FormGroup({
        compareType: new FormControl(this.detector.intervalDetector?.compareType ?? ''),
        aggregateOperation: new FormControl(this.detector.intervalDetector?.aggregateOperation ?? ''),
        threshold: new FormControl(this.detector.intervalDetector?.threshold),
      }),

      minMaxDetector: new FormGroup({
        lowerThreshold: new FormControl(this.detector.minMaxDetector?.lowerThreshold),
        upperThreshold: new FormControl(this.detector.minMaxDetector?.upperThreshold),
        maxHits: new FormControl(this.detector.minMaxDetector?.maxHits),
      }),

      endpoint: new FormControl(this.detector.action.endpoint, [Validators.required]),
      type: new FormControl(this.detector.action.type, [Validators.required]),
    })
  }

  isIntervalDetector() {
    return this.detectorForm.value.detectorType == 'interval'
  }

  isMinMaxDetector() {
    return this.detectorForm.value.detectorType == 'minmax'
  }
}
