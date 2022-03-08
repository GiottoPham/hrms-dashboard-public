import { AttendanceTable } from '@components/AttendancePage/AttendanceTable'
import { Layout } from '@components/Layout/Layout'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const AttendancePage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Attendance</h1>
        )}
      >
        <div className="w-full p-5">
          <AttendanceTable />
        </div>
      </Layout>
    </AuthGuard>
  )
}
