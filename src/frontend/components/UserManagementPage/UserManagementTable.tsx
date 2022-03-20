import { Button, IconButton } from '@mui/material'
import type { Column } from 'react-table'
import { Table } from '@frontend/framework/Table'
import EditIcon from '@mui/icons-material/Edit'
import { UpDownIcon } from '@frontend/framework/icons/UpDownIcon'
import AddIcon from '@mui/icons-material/Add'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { AddUserButton } from '@components/UserManagementPage/AddUserButton'
import type { UserDetail } from '@frontend/types/user'
import { capitalize } from 'lodash'
import { useUserParams } from '@frontend/state/user-params'
import { useUsers } from '@frontend/state/user-queries'
type CreateHeaderInput = {
  headerText: string
  sortBy: keyof UserDetail
}
const createHeader = ({ headerText, sortBy }: CreateHeaderInput) => {
  const Header = () => {
    const {
      userParams: { sort },
      setUserParams,
    } = useUserParams()
    return (
      <header className="flex items-center">
        {headerText}
        <IconButton
          classes={{ root: 'p-1 w-8 h-8' }}
          onClick={() => {
            if (sort.sortBy === sortBy) {
              if (sort.sortOrder === 'asc') {
                setUserParams((prev) => ({
                  ...prev!,
                  sort: { ...sort, sortOrder: 'desc' },
                }))
              } else
                setUserParams((prev) => ({
                  ...prev!,
                  sort: { ...sort, sortOrder: 'asc' },
                }))
            } else {
              setUserParams((prev) => ({
                ...prev!,
                sort: { sortBy: sortBy, sortOrder: 'asc' },
              }))
            }
          }}
        >
          {sort?.sortBy !== sortBy && <UpDownIcon />}
          {sort?.sortBy === sortBy && sort.sortOrder === 'asc' && (
            <UpDownIcon isUp={true} />
          )}
          {sort?.sortBy === sortBy && sort.sortOrder === 'desc' && (
            <UpDownIcon isUp={false} />
          )}
        </IconButton>
      </header>
    )
  }

  return Header
}

export const UserManagementTable = () => {
  const { userParams } = useUserParams()
  const roleFake = [
    {
      id: 1,
      name: 'User',
    },
    {
      id: 2,
      name: 'Super User',
    },
    {
      id: 3,
      name: 'Admin',
    },
  ]
  const columns: Column<UserDetail>[] = [
    {
      Header: createHeader({ headerText: 'ID', sortBy: 'id' }),
      accessor: 'id',
      Cell: ({ value }) => <p>{value}</p>,
      width: 'w-[68px]',
    },
    {
      Header: createHeader({ headerText: 'Username', sortBy: 'username' }),
      accessor: 'username',
      Cell: ({ value }) => <p>{value}</p>,
      width: 'w-[250px]',
    },
    {
      Header: createHeader({ headerText: 'Role', sortBy: 'roleid' }),
      accessor: 'roleid',
      Cell: ({ value }) => (
        <p>{roleFake.find((role) => role.id === value)?.name}</p>
      ),
      width: 'w-[250px]',
    },
    {
      Header: createHeader({ headerText: 'Status', sortBy: 'status' }),
      accessor: 'status',
      Cell: ({ value }) => <p>{capitalize(value)}</p>,
      width: 'w-[250px]',
    },
    {
      id: 'actionCell',
      accessor: 'id',
      Cell: ({ row }) => (
        <div className="flex justify-end">
          <AddUserButton
            isEdit={true}
            userDetail={row.original}
            renderButton={({ openModal }) => (
              <IconButton onClick={openModal}>
                <EditIcon className="w-5 h-5" />
              </IconButton>
            )}
          />
        </div>
      ),
      width: 'w-[50px]',
    },
  ]
  const { users = [], isLoading } = useUsers(userParams)
  return (
    <div className="rounded px-10 py-5 flex flex-col">
      <AddUserButton
        renderButton={({ openModal }) => (
          <Button
            classes={{
              root: 'min-w-0 w-10 h-10 bg-white border-2 border-primary rounded-full self-end -mb-5 z-20 mr-5',
            }}
            color="inherit"
            variant="outlined"
            onClick={openModal}
          >
            <AddIcon className="w-5 h-5 text-primary" />
          </Button>
        )}
      />

      <Table<UserDetail>
        data={users as UserDetail[]}
        columns={columns}
        rowCount={5}
        isLoading={isLoading}
      />
      <div className="self-end mt-5">
        <Button
          classes={{
            root: 'min-w-0 w-10 h-10 bg-white border border-primary',
          }}
          color="inherit"
          variant="outlined"
          // onClick={() => {
          //   if (userParams.pagination && userParams.pagination > 1) {
          //     setUserParams((prev) => ({
          //       ...prev!,
          //       pagination: userParams.pagination - 1,
          //     }))
          //   }
          // }}
        >
          <ChevronLeftIcon className="w-7 h-7 text-primary" />
        </Button>
        <Button
          classes={{
            root: 'min-w-0 w-10 h-10 bg-white border border-primary ml-5',
          }}
          color="inherit"
          variant="outlined"
          // onClick={() => {
          //   if (userParams.pagination)
          //     setUserParams((prev) => ({
          //       ...prev!,
          //       pagination: userParams.pagination + 1,
          //     }))
          // }}
        >
          <ChevronRightIcon className="w-7 h-7 text-primary" />
        </Button>
      </div>
    </div>
  )
}
