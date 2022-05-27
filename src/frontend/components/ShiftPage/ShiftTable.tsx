import { Button, IconButton } from '@mui/material'
import type { Column } from 'react-table'
import { Table } from '@frontend/framework/Table'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { AddShiftButton } from './AddShiftButton'

import type { Shift } from '@frontend/types/shift'
import { useShifts } from '@frontend/state/shift-queries'
import { changeTime } from '@frontend/framework/utils/time'
import { formatDate } from '@frontend/framework/utils/date'
type CreateHeaderInput = {
  headerText: string
}
const createHeader = ({ headerText }: CreateHeaderInput) => {
  const Header = () => {
    return <header className="flex items-center">{headerText}</header>
  }

  return Header
}

export const ShiftTable = () => {
  const { shifts = [], isLoading } = useShifts()
  const columns: Column<Shift>[] = [
    {
      Header: createHeader({ headerText: 'Id' }),
      accessor: 'id',
      Cell: ({ value }) => <p>{value}</p>,
      width: 'w-[50px]',
    },
    {
      Header: createHeader({ headerText: 'Shift Title' }),
      accessor: 'name',
      Cell: ({ value }) => <p className="truncate">{value}</p>,
      width: 'w-[150px]',
    },
    {
      Header: createHeader({
        headerText: 'Time in',
      }),
      accessor: 'timeIn',
      Cell: ({ value }) => (
        <p className="leading-loose line-clamp-2">
          {formatDate(changeTime(value), 'HH:mm')}
        </p>
      ),
      width: 'w-[200px]',
    },
    {
      Header: createHeader({
        headerText: 'Time out',
      }),
      accessor: 'timeOut',
      Cell: ({ value }) => (
        <p className="leading-loose line-clamp-2">
          {formatDate(changeTime(value), 'HH:mm')}
        </p>
      ),
      width: 'w-[200px]',
    },
    {
      id: 'actionCell',
      accessor: 'id',
      Cell: ({ row }) => (
        <div className="flex justify-end">
          <AddShiftButton
            isEdit={true}
            shiftDetail={row.original}
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
      <AddShiftButton
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

      <Table<Shift>
        data={shifts}
        columns={columns}
        rowCount={5}
        isLoading={isLoading}
      />
    </div>
  )
}
