import type { UserInputParams } from '@frontend/types/user'

export type Employee = {
  id: number
  personalDetail: Omit<PersonalDetailInputParams, 'avatar'> & {
    avatar: string
  }
  jobDetail: JobDetailInputParams
  insurance: InsuranceInputParams
}
export type PersonalDetailInputParams = {
  avatar: File | Blob
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  phone: string
  permanentAddress: Address
  temporaryAddress: Address
}
export type JobDetailInputParams = {
  joinDate: string
  jobId: number
  pit: string
  unitId: number
  salaryGroup: number
  salary: string
  bonus: Bonus[]
}
export type AssignAccountInputParams = {
  type: 'available' | 'new'
  accountId: number | null
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
  bonusAmount: string
}
export type EmployeeParams = {
  jobDetail: JobDetailInputParams
  personalDetail: PersonalDetailInputParams
  accountDetail: AssignAccountInputParams
}

export type InsuranceInputParams = {
  id: number
  health: InsuranceCommon & {
    cityId: number
    kcbId: number
  }
  social: InsuranceCommon
  unemployment: InsuranceCommon
}
export type InsuranceCommon = {
  number: string
  issueDate: string
  toDate: string
  fromDate: string
}
