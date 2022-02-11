import { UnitCard } from '@components/OrganizationPage/UnitCard'
import type { Unit } from '@frontend/types/unit'
import { useState } from 'react'

export const ListUnitCard = ({ name, subUnit, type }: Omit<Unit, 'id'>) => {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <UnitCard
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
            }) => (
              <div key={subId} className="mt-5">
                <ListUnitCard
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
