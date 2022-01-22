import { Layout } from '@components/Layout/Layout'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const MyInfoPage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">My Info</h1>
        )}
      >
        My Info
      </Layout>
    </AuthGuard>
  )
}
