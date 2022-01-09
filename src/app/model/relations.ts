export interface Relations {
  nodes: Array<string>
  links: Array<Relation>
}

export interface Relation {
  source: string
  target: string
  value: number
}
