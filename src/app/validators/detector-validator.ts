import {AbstractControl, ValidationErrors} from "@angular/forms";
import {DetectorType} from "../model/detector-type";
import {errorIfNotInArray} from "./array-validator";
import {AggregateOperation} from "../model/aggregate-operation";
import {CompareType} from "../model/compare-type";

export const DetectorValidator = (control: AbstractControl): ValidationErrors | null => {
  const type = control.get('detectorType')?.value
  if (type == DetectorType.Interval) {
    const values = control.get('intervalDetector')?.value
    if (!values.aggregateOperation) {
      return {'detector': 'Aggregate Operation is required.'}
    }
    const aggOpErr = errorIfNotInArray(values.aggregateOperation, Object.keys(AggregateOperation));
    if (aggOpErr) {
      return {'detector': 'Aggregate operation: ' + aggOpErr}

    }

    if (!values.compareType) {
      return {'detector': 'Compare Type is required.'}
    }
    const compType = errorIfNotInArray(values.compareType, Object.keys(CompareType));
    if (compType) {
      return {'detector': 'Compare Type: ' + compType}
    }

    if (values.threshold == undefined) {
      return {'detector': 'Threshold is required and has to be a number.'}
    }
    if (isNaN(parseInt(values.threshold))) {
      return {'detector': 'Threshold is not a number.'}
    }
    return null
  }
  const values = control.get('minMaxDetector')?.value

  if (values.lowerThreshold == undefined) {
    return {'detector': 'Lower threshold is required and has to be a number.'}
  }

  if (values.upperThreshold == undefined) {
    return {'detector': 'Upper threshold is required and has to be a number.'}
  }
  if (values.lowerThreshold >= values.upperThreshold) {
    return {'detector': 'Upper threshold has to be greater the lower threshold.'}
  }

  if (values.maxHits == undefined) {
    return {'detector': 'Max hits is required and has to be a number.'}
  }
  return values.maxHits < 1 ? {'detector': 'Max hits has to be greater zero.'} : null
}
