export type Unit = {
  id: number
  type: 'head' | 'sub-head' | 'sub'
  name: string
  subUnit: Unit[] | null
}
