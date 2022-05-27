export type ShiftDetailInput = {
  name: string
  timeIn: string
  timeOut: string
}
export type Shift = ShiftDetailInput & { id: number }
