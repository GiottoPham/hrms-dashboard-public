import { Layout } from '@components/Layout/Layout'
import { ListUnitCard } from '@components/OrganizationPage/ListUnitCard'
import { UnitCardSkeleton } from '@components/OrganizationPage/UnitCardSkeleton'
import { AuthGuard } from '@frontend/framework/AuthGuard'
import { useUnits } from '@frontend/state/unit-queries'

export const OrganizationPage = () => {
  const { units = [], isLoading } = useUnits(true)

  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Organization</h1>
        )}
      >
        <div className="flex flex-col px-10 py-5 ">
          {isLoading ? (
            <UnitCardSkeleton />
          ) : (
            units.map(
              ({
                id,
                name,
                type,
                subUnits,
                headOfUnitId,
                peopleNumber,
                description,
              }) => (
                <div key={id} className="mt-5">
                  <ListUnitCard
                    id={id}
                    name={name}
                    type={type}
                    subUnits={subUnits}
                    headOfUnitId={headOfUnitId}
                    peopleNumber={peopleNumber}
                    description={description}
                  />
                </div>
              )
            )
          )}
        </div>
      </Layout>
    </AuthGuard>
  )
}
