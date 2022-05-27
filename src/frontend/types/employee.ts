import type { UserInputParams } from '@frontend/types/user'

export type Employee = {
  id: number
  personalDetail: Omit<PersonalDetailInputParams, 'avatar'> & {
    avatar: string
  }
  jobDetail: JobDetailInputParams
  insuranceDetail: InsuranceInputParams
}
export type PersonalDetailInputParams = {
  avatar: File
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  phone: string
  permanentAddress: Address
  temporaryAddress: Address
  sex: string
}
export type JobDetailInputParams = {
  joinDate: string
  jobId: number
  pit: string
  departmentId: number
  salaryGroup: number
  salary: number
  bonus: Bonus[]
  shiftId: number
}
export type AssignAccountInputParams = {
  type: 'available' | 'new'
  id: number | null
  newAccount: UserInputParams | null
}
export type Address = {
  cityId: number
  districtId: number
  wardId: number
  address: string
}
export type Bonus = {
  bonusName: string
  bonusAmount: number
}
export type EmployeeParams = {
  jobDetail: JobDetailInputParams
  personalDetail: PersonalDetailInputParams
  accountDetail: AssignAccountInputParams
}

export type InsuranceInputParams = {
  cityId: number
  kcbId: number
  health: InsuranceCommon
  social: InsuranceCommon
  unemployment: InsuranceCommon
}
export type InsuranceCommon = {
  number: string
  issue_date: string
  to_date: string
  from_date: string
}
