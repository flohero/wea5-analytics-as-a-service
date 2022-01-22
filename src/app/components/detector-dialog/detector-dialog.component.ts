import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {Detector} from '../../model/detector';
import {ActionType} from "../../model/action-type";
import {CompareType} from "../../model/compare-type";
import {AggregateOperation} from "../../model/aggregate-operation";
import {timeSpanValidator} from "../../validators/timespan-validator";
import {DetectorType} from "../../model/detector-type";
import {ArrayValidator} from "../../validators/array-validator";
import {DetectorValidator} from "../../validators/detector-validator";
import {ActionValidator} from "../../validators/action-validator";
import {formatTimespan, parseTimespan} from "../../utils/timespan-util";

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
    metricName: '',
    offset: '',
    action: {
      id: 0,
      type: '',
      endpoint: ''
    }
  }

  @Output() detectorCreatedEvent: EventEmitter<Detector> = new EventEmitter<Detector>()

  actionTypes: Array<string> = Object.keys(ActionType)
  compareTypes: Array<string> = Object.keys(CompareType)
  aggregateOperations: Array<string> = Object.keys(AggregateOperation)
  detectorTypes: Array<string> = Object.keys(DetectorType)

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    const interval = parseTimespan(this.detector.interval)
    const offset = parseTimespan(this.detector.offset)
    this.detectorForm = this.formBuilder.group({
        name: [this.detector.metricName],
        interval: this.formBuilder.group({
            hours: interval?.hours,
            minutes: interval?.minutes,
            seconds: interval?.seconds
          },
          {validators: timeSpanValidator}
        ),
        offset: this.formBuilder.group({
            hours: offset?.hours,
            minutes: offset?.minutes,
            seconds: offset?.seconds
          },
          {validators: timeSpanValidator}
        ),

        activated: [this.detector.activated ?? true],
        detectorType: [this.detector.intervalDetector ? DetectorType.Interval : DetectorType.MinMax],

        intervalDetector: this.formBuilder.group({
            compareType: [this.detector.intervalDetector?.compareType ?? ''],
            aggregateOperation: [this.detector.intervalDetector?.aggregateOperation ?? ''],
            threshold: [this.detector.intervalDetector?.threshold],
          }
        ),

        minMaxDetector: this.formBuilder.group({
          lowerThreshold: [this.detector.minMaxDetector?.lowerThreshold],
          upperThreshold: [this.detector.minMaxDetector?.upperThreshold],
          maxHits: [this.detector.minMaxDetector?.maxHits],
        }),

        endpoint: [this.detector.action.endpoint],
        type: [this.detector.action.type, [ArrayValidator(this.actionTypes)]],
      },
      {validators: [DetectorValidator, ActionValidator]}
    )
  }

  isIntervalDetector() {
    return this.detectorForm.value.detectorType == DetectorType.Interval
  }

  isMinMaxDetector() {
    return this.detectorForm.value.detectorType == DetectorType.MinMax
  }

  addDetector() {
    if (this.detectorForm.valid) {
      const values = this.detectorForm.value
      const detector: Detector = {
        id: this.detector.id,
        metricName: values.name,
        action: {
          id: this.detector.action.id,
          type: values.type,
          endpoint: values.endpoint
        },
        activated: values.activated,
        interval: formatTimespan({
          hours: values.interval.hours ?? 0,
          minutes: values.interval.minutes ?? 0,
          seconds: values.interval.seconds ?? 0,
        }),
        offset: formatTimespan({
          hours: values.offset.hours ?? 0,
          minutes: values.offset.minutes ?? 0,
          seconds: values.offset.seconds ?? 0,
        }),
      }
      if (this.isIntervalDetector()) {
        detector.intervalDetector = {
          id: this.detector.intervalDetector?.id ?? 0,
          aggregateOperation: values.intervalDetector.aggregateOperation,
          compareType: values.intervalDetector.compareType,
          threshold: values.intervalDetector.threshold
        }
      } else {
        detector.minMaxDetector = {
          id: this.detector.minMaxDetector?.id ?? 0,
          lowerThreshold: values.minMaxDetector.lowerThreshold,
          maxHits: values.minMaxDetector.maxHits,
          upperThreshold: values.minMaxDetector.upperThreshold
        }
      }
      this.detectorCreatedEvent.emit(detector)
    }
  }

  getErrorMessage(control?: AbstractControl | null): Array<string> {
    if (!control) {
      return [];
    }
    const errors: Array<string> = []
    if (control.hasError('required')) {
      errors.push('Field is required.')
    }
    if (control.hasError('timespan')) {
      errors.push(control.getError('timespan'))
    }
    if (control.hasError('member')) {
      errors.push(control.getError('member'))
    }
    if (control.hasError('detector')) {
      errors.push(control.getError('detector'))
    }
    if (control.hasError('email')) {
      errors.push('Not a valid email')
    }
    if (control.hasError('pattern')) {
      errors.push('Not a valid url: "https//:analytics-as-a-service.com"')
    }
    return errors
  }
}
