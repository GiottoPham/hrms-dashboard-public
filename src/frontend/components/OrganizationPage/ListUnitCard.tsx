import { UnitCard } from '@components/OrganizationPage/UnitCard'
import type { Unit } from '@frontend/types/unit'
import { useState } from 'react'

export const ListUnitCard = ({
  id,
  name,
  subUnits,
  type,
  headOfUnitId,
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
        headOfUnitId={headOfUnitId}
        name={name}
        label={
          type === 'head'
            ? 'Head Unit'
            : type === 'sub-head'
            ? 'Head of sub unit'
            : 'Sub unit'
        }
        handleClick={() => setToggle(!toggle)}
      />
      <div className="ml-20 flex flex-col">
        {toggle &&
          subUnits?.map(
            ({
              id: subId,
              name: subName,
              subUnits: subOfUnit,
              type: subType,
              headOfUnitId: subHeadOfUnit,
              peopleNumber: subPeopleNumber,
              description: subDescription,
            }) => (
              <div key={subId} className="mt-5">
                <ListUnitCard
                  id={subId}
                  peopleNumber={subPeopleNumber}
                  description={subDescription}
                  headOfUnitId={subHeadOfUnit}
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
