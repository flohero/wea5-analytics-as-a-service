export interface Metric {
  id: number
  name: string
  createdAt: Date
  instanceId: string
  type: string
  value: number
  start: Date | null
  end: Date | null
}
