export interface MetricFilter {
  name: string
  from: Date | null
  to: Date | null
  count: number
}
