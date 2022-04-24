export type AttendanceList = {
  first: boolean
  last: boolean
  attendanceList: Attendance[]
}
export type Attendance = {
  name: string
  departmentName: string
  jobTitle: string
  checkins: Checkin[]
}
export type Checkin = {
  status: number
  time_in: string | null
  time_out: string | null
  date: string
}
