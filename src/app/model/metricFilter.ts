export interface MetricFilter {
  name: string
  type: string
  from: Date | null
  to: Date | null
  count: number
  page: number
}
