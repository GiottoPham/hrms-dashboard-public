export type Unit = {
  id: number
  type: 'head' | 'sub-head' | 'sub'
  name: string
  peopleNumber: number
  description: string
  headOfUnit: string
  subUnit: Unit[] | null
}
export type UnitInputParams = {
  name: string
  description: string
  headOfUnitId: number
}
