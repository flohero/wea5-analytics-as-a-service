import {MinMaxDetector} from "./min-max-detector";
import {IntervalDetector} from "./interval-detector";

export interface Detector {
  id: number
  metricName: string
  interval: string
  offset: string
  activated: boolean
  lastExecuted: Date
  minMaxDetector?: MinMaxDetector
  intervalDetector?: IntervalDetector
}
