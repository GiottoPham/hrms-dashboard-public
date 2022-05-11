import { AttendanceChart } from '@components/Dashboard/AttendanceChart'
import { AttendanceColumnChart } from '@components/Dashboard/AttendanceColumnChart'
import { AttendancePieChart } from '@components/Dashboard/AttendancePieChart'
import { WeekSelect } from '@components/Dashboard/WeekSelect'
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
        <div className="w-full p-5 space-y-5">
          <div className="w-1/4">
            <WeekSelect />
          </div>

          <div className="flex justify-between w-full">
            <div className="w-7/12 ">
              <div className="bg-white p-5 rounded-lg border-primary border mb-5">
                <h1 className="text-2xl font-bold">Attendance Column Chart</h1>
                <p className="font-nunito">
                  This chart is used to illustrate number of all employees who
                  go to work either on-time, late-early or off in the week.
                </p>
              </div>
              <AttendanceColumnChart />
            </div>
            <div className="w-4/12">
              <div className="bg-white p-5 rounded-lg border-primary border mb-5">
                <h1 className="text-2xl font-bold">Attendance Pie Chart</h1>
                <p className="font-nunito">
                  This chart is used to illustrate ratio of employees going to
                  work on-time, late-early and off in the week.
                </p>
              </div>
              <AttendancePieChart />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-7/12">
              <div className="bg-white p-5 rounded-lg border-primary border mb-5">
                <h1 className="text-2xl font-bold">Working Hours Line Chart</h1>
                <p className="font-nunito">
                  This chart is used to illustrate average number working hours
                  of each employee in each day of a week
                </p>
              </div>
              <AttendanceChart />
            </div>
          </div>
        </div>
      </Layout>
    </AuthGuard>
  )
}
