import { Layout } from '@components/Layout/Layout'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const RolePage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Role</h1>
        )}
      >
        Role
      </Layout>
    </AuthGuard>
  )
}
