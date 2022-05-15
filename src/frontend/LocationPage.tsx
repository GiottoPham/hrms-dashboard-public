import { Layout } from '@components/Layout/Layout'
import { AuthGuard } from '@frontend/framework/AuthGuard'
import { LocationTable } from '@components/LocationPage/LocationTable'
export const LocationPage = () => {
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Location</h1>
        )}
      >
        <LocationTable />
      </Layout>
    </AuthGuard>
  )
}
