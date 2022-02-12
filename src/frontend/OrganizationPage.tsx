import { Layout } from '@components/Layout/Layout'
import { ListUnitCard } from '@components/OrganizationPage/ListUnitCard'
import { AuthGuard } from '@frontend/framework/AuthGuard'
import type { Unit } from '@frontend/types/unit'

export const OrganizationPage = () => {
  const LIST_UNIT: Unit[] = [
    {
      id: 1,
      name: 'CEO',
      type: 'head',
      peopleNumber: 20,
      description: 'abcxyz',
      headOfUnit: 'Pham Gia Nguyen',
      subUnit: [
        {
          id: 2,
          name: 'CEO',
          type: 'sub-head',
          peopleNumber: 10,
          description: 'abcxyz',
          headOfUnit: 'Pham Khang Nguyen',
          subUnit: [
            {
              id: 3,
              name: 'CEO',
              subUnit: null,
              type: 'sub',
              peopleNumber: 5,
              description: 'abcxyz',
              headOfUnit: 'Truong Anh Bao',
            },
            {
              id: 4,
              name: 'CEO',
              subUnit: null,
              type: 'sub',
              peopleNumber: 5,
              description: 'abcxyz',
              headOfUnit: 'Truong Anh Bao',
            },
          ],
        },
        {
          id: 5,
          name: 'CEO',
          subUnit: null,
          type: 'sub-head',
          peopleNumber: 10,
          description: 'abcxyz',
          headOfUnit: 'Truong Anh Bao',
        },
      ],
    },
    {
      id: 6,
      name: 'CEO',
      type: 'head',
      peopleNumber: 20,
      description: 'abcxyz',
      headOfUnit: 'Pham Gia Nguyen',
      subUnit: [
        {
          id: 7,
          name: 'CEO',
          type: 'sub-head',
          peopleNumber: 10,
          description: 'abcxyz',
          headOfUnit: 'Pham Khang Nguyen',
          subUnit: [
            {
              id: 8,
              name: 'CEO',
              subUnit: null,
              type: 'sub',
              peopleNumber: 5,
              description: 'abcxyz',
              headOfUnit: 'Truong Anh Bao',
            },
            {
              id: 9,
              name: 'CEO',
              subUnit: null,
              type: 'sub',
              peopleNumber: 5,
              description: 'abcxyz',
              headOfUnit: 'Truong Anh Bao',
            },
          ],
        },
        {
          id: 10,
          name: 'CEO',
          subUnit: null,
          type: 'sub-head',
          peopleNumber: 10,
          description: 'abcxyz',
          headOfUnit: 'Truong Anh Bao',
        },
      ],
    },
  ]
  return (
    <AuthGuard>
      <Layout
        renderHeader={() => (
          <h1 className="font-bold text-2xl uppercase">Organization</h1>
        )}
      >
        <div className="flex flex-col px-10 py-5 ">
          {LIST_UNIT.map(
            ({
              id,
              name,
              type,
              subUnit,
              headOfUnit,
              peopleNumber,
              description,
            }) => (
              <div key={id} className="mt-5">
                <ListUnitCard
                  id={id}
                  name={name}
                  type={type}
                  subUnit={subUnit}
                  headOfUnit={headOfUnit}
                  peopleNumber={peopleNumber}
                  description={description}
                />
              </div>
            )
          )}
        </div>
      </Layout>
    </AuthGuard>
  )
}
