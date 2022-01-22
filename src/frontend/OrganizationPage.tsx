import { Layout } from '@components/Layout/Layout'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const OrganizationPage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Organization</h1>
        )}
      >
        Organization
      </Layout>
    </AuthGuard>
  )
}
