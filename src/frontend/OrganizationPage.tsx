import { Layout } from '@components/Layout/Layout'
import { UnitTable } from '@components/OrganizationPage/UnitTable'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const OrganizationPage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Organization</h1>
        )}
      >
        <UnitTable />
      </Layout>
    </AuthGuard>
  )
}
