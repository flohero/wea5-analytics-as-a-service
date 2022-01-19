export interface NameToValueMapping {
  [key: string]: ValueWithDate[]
}

export interface ValueWithDate {
  value: number
  createdAt: Date
}
