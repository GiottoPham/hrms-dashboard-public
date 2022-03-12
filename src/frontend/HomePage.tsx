import { AttendanceChart } from '@components/Dashboard/AttendanceChart'
import { AttendanceColumnChart } from '@components/Dashboard/AttendanceColumnChart'
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
        <div className="flex pt-20 space-x-5 w-full items-center justify-center h-full">
          <div className="w-5/12 right-5 bottom-5 absolute">
            <AttendanceChart />
          </div>
          <div className="w-1/2 absolute left-15 top-20">
            <AttendanceColumnChart />
          </div>
        </div>
      </Layout>
    </AuthGuard>
  )
}
