export type AttendanceList = Attendance[]
export type Attendance = {
  name: string
  unitName: string
  jobTitle: string
  listCheckin: Checkin[]
}
export type Checkin = {
  status: number
  timeIn: string | null
  timeOut: string | null
  date: string
}
