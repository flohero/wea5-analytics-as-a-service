export interface Log {
  id: number
  name: string
  type: LogTypes
  instanceId: string
  createdAt: Date
  message: string
}

export enum LogTypes {
  Trace = 0,
  Warning = 1,
  Error = 2
}
