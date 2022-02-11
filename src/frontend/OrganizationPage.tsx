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
      subUnit: [
        {
          id: 2,
          name: 'CEO',
          type: 'sub-head',
          subUnit: [
            {
              id: 3,
              name: 'CEO',
              subUnit: null,
              type: 'sub',
            },
            {
              id: 3,
              name: 'CEO',
              subUnit: null,
              type: 'sub',
            },
          ],
        },
        {
          id: 4,
          name: 'CEO',
          subUnit: null,
          type: 'sub-head',
        },
      ],
    },
    {
      id: 5,
      name: 'CEO',
      type: 'head',
      subUnit: [
        {
          id: 6,
          name: 'CEO',
          type: 'sub-head',
          subUnit: [
            {
              id: 7,
              name: 'CEO',
              subUnit: null,
              type: 'sub',
            },
            {
              id: 8,
              name: 'CEO',
              subUnit: null,
              type: 'sub',
            },
          ],
        },
        {
          id: 9,
          name: 'CEO',
          subUnit: null,
          type: 'sub-head',
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
          {LIST_UNIT.map(({ id, name, type, subUnit }) => (
            <div key={id} className="mt-5">
              <ListUnitCard name={name} type={type} subUnit={subUnit} />
            </div>
          ))}
        </div>
      </Layout>
    </AuthGuard>
  )
}
