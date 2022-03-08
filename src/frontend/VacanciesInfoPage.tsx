import { Layout } from '@components/Layout/Layout'
import { VacanciesInfoTable } from '@components/RecruitmentPage/VacanciesInfoPage/VacanciesInfoTable'
import { AuthGuard } from '@frontend/framework/AuthGuard'

export const VacanciesInfoPage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Vacancies Info</h1>
        )}
      >
        <VacanciesInfoTable />
      </Layout>
    </AuthGuard>
  )
}
