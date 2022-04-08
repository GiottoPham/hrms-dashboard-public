export type AttendanceList = Attendance[]
export type Attendance = {
  name: string
  departmentName: string
  jobTitle: string
  checkins: Checkin[]
}
export type Checkin = {
  status: number
  timeIn: string | null
  timeOut: string | null
  date: string
}
