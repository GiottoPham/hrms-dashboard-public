import { AttendanceChart } from '@components/Dashboard/AttendanceChart'
import { AttendanceColumnChart } from '@components/Dashboard/AttendanceColumnChart'
import { AttendancePieChart } from '@components/Dashboard/AttendancePieChart'
import { Layout } from '@components/Layout/Layout'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const HomePage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Dashboard</h1>
        )}
      >
        <div className="w-full p-5 flex space-x-10">
          <div className="w-7/12 ">
            <AttendanceColumnChart />
          </div>
          <div className="w-5/12 space-y-10 flex flex-col">
            <AttendanceChart />
            <AttendancePieChart />
          </div>
        </div>
      </Layout>
    </AuthGuard>
  )
}
