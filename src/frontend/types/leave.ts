export type LeaveEmployeeList = LeaveDetail[]
export type LeaveDetail = {
  id: number
  employeeName: string
  departmentName: string
  applicationDate: string
  fromDate: string
  toDate: string
  total: number
  status: number
  leaveType: number
}
export type CheckedLeaveDetail = Record<RowIndex, id>
type RowIndex = number
type id = number

export type LeaveParams = {
  departmentId: number
  date: string
  pagination: number // 1 page = 10 item
  sortBy: keyof LeaveDetail // string
  sortOrder: 'asc' | 'desc'
}
export type LeaveDetails = {
  first: boolean
  last: boolean
  leaveEmployeeList: LeaveDetail[]
}
export type LeaveNotification = {
  title: string
  body: string
}
