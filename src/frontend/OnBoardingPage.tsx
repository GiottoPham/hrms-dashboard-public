import { Layout } from '@components/Layout/Layout'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const OnBoardingPage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">On Boarding</h1>
        )}
      >
        On Boarding
      </Layout>
    </AuthGuard>
  )
}
