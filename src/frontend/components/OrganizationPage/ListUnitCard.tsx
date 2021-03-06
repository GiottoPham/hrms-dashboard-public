import { UnitCard } from '@components/OrganizationPage/UnitCard'
import type { Unit } from '@frontend/types/unit'
import { useState } from 'react'

export const ListUnitCard = ({
  id,
  name,
  subUnits,
  type,
  managerOfUnitId,
  description,
  peopleNumber,
}: Unit) => {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <UnitCard
        id={id}
        description={description}
        peopleNumber={peopleNumber}
        managerOfUnitId={managerOfUnitId}
        name={name}
        label={type === 'head' ? 'Head Unit' : 'Sub unit'}
        handleClick={() => setToggle(!toggle)}
        noMore={subUnits?.length === 0}
      />
      <div className="ml-20 flex flex-col">
        {toggle &&
          subUnits
            ?.sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            )
            .map(
              ({
                id: subId,
                name: subName,
                subUnits: subOfUnit,
                type: subType,
                managerOfUnitId: subHeadOfUnit,
                peopleNumber: subPeopleNumber,
                description: subDescription,
              }) => (
                <div key={subId} className="mt-5">
                  <ListUnitCard
                    id={subId}
                    peopleNumber={subPeopleNumber}
                    description={subDescription}
                    managerOfUnitId={subHeadOfUnit}
                    name={subName}
                    subUnits={subOfUnit}
                    type={subType}
                  />
                </div>
              )
            )}
      </div>
    </>
  )
}
