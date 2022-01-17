export interface TelemetryFilter {
  name: string
  names: Array<string>
  type: string
  from: Date | null
  to: Date | null
  count: number
  page: number
}