import { ListUnitCard } from '@components/OrganizationPage/ListUnitCard'
import { UnitCardSkeleton } from '@components/OrganizationPage/UnitCardSkeleton'
import { useUnits } from '@frontend/state/unit-queries'
export const UnitTable = () => {
  const { units = [], isLoading } = useUnits(true)
  return (
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
            peopleNumber,
            description,
            managerOfUnitId,
          }) => (
            <div key={id} className="mt-5">
              <ListUnitCard
                id={id}
                name={name}
                type={type}
                subUnits={subUnits}
                peopleNumber={peopleNumber}
                description={description}
                managerOfUnitId={managerOfUnitId}
              />
            </div>
          )
        )
      )}
    </div>
  )
}
