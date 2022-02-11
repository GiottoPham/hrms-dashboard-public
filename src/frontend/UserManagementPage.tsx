import { Layout } from '@components/Layout/Layout'
import { AuthGuard } from '@frontend/framework/AuthGuard'
import { UserManagementTable } from '@components/UserManagementPage/UserManagementTable'

export const UserManagementPage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">User Management</h1>
        )}
      >
        <UserManagementTable />
      </Layout>
    </AuthGuard>
  )
}
