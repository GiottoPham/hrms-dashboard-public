import { Layout } from '@components/Layout/Layout'
import { EmployeeTable } from '@components/PIMPage/EmployeesInfoPage/EmployeeTable'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const EmployeesInfoPage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Employees Info</h1>
        )}
      >
        <EmployeeTable />
      </Layout>
    </AuthGuard>
  )
}
