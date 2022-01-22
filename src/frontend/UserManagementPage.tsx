import { Layout } from '@components/Layout/Layout'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const UserManagementPage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">User Management</h1>
        )}
      >
        User Management
      </Layout>
    </AuthGuard>
  )
}
