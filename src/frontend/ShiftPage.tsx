import { Layout } from '@components/Layout/Layout'
import { ShiftTable } from '@components/ShiftPage/ShiftTable'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const ShiftPage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Shift</h1>
        )}
      >
        <ShiftTable />
      </Layout>
    </AuthGuard>
  )
}
