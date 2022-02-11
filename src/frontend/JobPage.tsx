import { JobTable } from '@components/JobPage/JobTable'
import { Layout } from '@components/Layout/Layout'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const JobPage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Job</h1>
        )}
      >
        <JobTable />
      </Layout>
    </AuthGuard>
  )
}
