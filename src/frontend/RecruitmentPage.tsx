import { Layout } from '@components/Layout/Layout'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const RecruitmentPage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Recruitment</h1>
        )}
      >
        Recruitment
      </Layout>
    </AuthGuard>
  )
}
