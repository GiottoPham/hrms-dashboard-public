import { Layout } from '@components/Layout/Layout'
import { LeaveTable } from '@components/LeavePage/LeaveTable'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const LeavePage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Leave</h1>
        )}
      >
        <LeaveTable />
      </Layout>
    </AuthGuard>
  )
}
