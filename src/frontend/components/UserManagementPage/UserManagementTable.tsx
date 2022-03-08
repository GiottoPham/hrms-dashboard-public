import { Button, IconButton } from '@mui/material'
import type { Column } from 'react-table'
import { Table } from '@frontend/framework/Table'
import EditIcon from '@mui/icons-material/Edit'
import { UpDownIcon } from '@frontend/framework/icons/UpDownIcon'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { AddUserButton } from '@components/UserManagementPage/AddUserButton'
import { UserDetail, UserStatus } from '@frontend/types/user'
import { capitalize } from 'lodash'
type CreateHeaderInput = {
  headerText: string
  sortBy: keyof UserDetail
}
const createHeader = ({ headerText, sortBy }: CreateHeaderInput) => {
  const Header = () => {
    const [sort, setSort] = useState({ sortBy: 'id', sortOrder: 'asc' })

    return (
      <header className="flex items-center">
        {headerText}
        <IconButton
          classes={{ root: 'p-1 w-8 h-8' }}
          onClick={() => {
            if (sort.sortOrder === 'asc')
              setSort((prev) => ({ ...prev, sortOrder: 'desc' }))
            else setSort((prev) => ({ ...prev, sortOrder: 'asc' }))
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
  const userFake: UserDetail[] = [
    {
      id: 1,
      username: 'khoaideptrai',
      roleId: 1,
      userStatus: UserStatus.Enable,
      password: 'abcdxyz',
    },
    {
      id: 2,
      username: 'khoaideptrai1',
      roleId: 2,
      userStatus: UserStatus.Enable,
      password: 'abcdxyz1',
    },
    {
      id: 3,
      username: 'khoaideptrai3',
      roleId: 3,
      userStatus: UserStatus.Enable,
      password: 'abcdxyz3',
    },
    {
      id: 4,
      username: 'khoaideptrai4',
      roleId: 1,
      userStatus: UserStatus.Enable,
      password: 'abcdxyz4',
    },
    {
      id: 5,
      username: 'khoaideptrai5',
      roleId: 2,
      userStatus: UserStatus.Enable,
      password: 'abcdxyz5',
    },
  ]
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
      Header: createHeader({ headerText: 'Role', sortBy: 'roleId' }),
      accessor: 'roleId',
      Cell: ({ value }) => (
        <p>{roleFake.find((role) => role.id === value)?.name}</p>
      ),
      width: 'w-[250px]',
    },
    {
      Header: createHeader({ headerText: 'Status', sortBy: 'userStatus' }),
      accessor: 'userStatus',
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

      <Table<UserDetail> data={userFake} columns={columns} rowCount={5} />
      <div className="self-end mt-5">
        <Button
          classes={{
            root: 'min-w-0 w-10 h-10 bg-white border border-primary',
          }}
          color="inherit"
          variant="outlined"
        >
          <ChevronLeftIcon className="w-7 h-7 text-primary" />
        </Button>
        <Button
          classes={{
            root: 'min-w-0 w-10 h-10 bg-white border border-primary ml-5',
          }}
          color="inherit"
          variant="outlined"
        >
          <ChevronRightIcon className="w-7 h-7 text-primary" />
        </Button>
      </div>
    </div>
  )
}
