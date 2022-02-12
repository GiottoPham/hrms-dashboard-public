import { UnitCard } from '@components/OrganizationPage/UnitCard'
import type { Unit } from '@frontend/types/unit'
import { useState } from 'react'

export const ListUnitCard = ({
  id,
  name,
  subUnit,
  type,
  headOfUnit,
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
        headOfUnit={headOfUnit}
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
          subUnit?.map(
            ({
              id: subId,
              name: subName,
              subUnit: subOfUnit,
              type: subType,
              headOfUnit: subHeadOfUnit,
              peopleNumber: subPeopleNumber,
              description: subDescription,
            }) => (
              <div key={subId} className="mt-5">
                <ListUnitCard
                  id={subId}
                  peopleNumber={subPeopleNumber}
                  description={subDescription}
                  headOfUnit={subHeadOfUnit}
                  name={subName}
                  subUnit={subOfUnit}
                  type={subType}
                />
              </div>
            )
          )}
      </div>
    </>
  )
}
