import { Layout } from '@components/Layout/Layout'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const PayrollPage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Payroll</h1>
        )}
      >
        Payroll
      </Layout>
    </AuthGuard>
  )
}
