import { Layout } from '@components/Layout/Layout'
import { CandidatesTable } from '@components/RecruitmentPage/CandidatePage/CandidatesTable'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const CandidatePage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Candidate</h1>
        )}
      >
        <CandidatesTable />
      </Layout>
    </AuthGuard>
  )
}
