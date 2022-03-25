export type LeaveEmployeeList = LeaveDetail[]
export type LeaveDetail = {
  id: number
  employeeName: string
  unitName: string
  applicationDate: string
  fromDate: string
  toDate: string
  total: number
  status: number
}
export type CheckedLeaveDetail = Record<RowIndex, id>
type RowIndex = number
type id = number

export type LeaveParams = {
  departmentId: number
  date: string
  pagination: number // 1 page = 10 item
  sort: {
    sortBy: keyof LeaveDetail // string
    sortOrder: 'asc' | 'desc'
  }
}
