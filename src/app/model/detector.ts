import {MinMaxDetector} from "./min-max-detector";
import {IntervalDetector} from "./interval-detector";
import {Action} from "./action";

export interface Detector {
  id: number
  metricName: string
  interval: string
  offset: string
  activated: boolean
  lastExecuted?: Date | null
  action: Action
  minMaxDetector?: MinMaxDetector
  intervalDetector?: IntervalDetector
}
