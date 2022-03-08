import { Button, Checkbox, IconButton } from '@mui/material'
import type { Column } from 'react-table'
import { Table } from '@frontend/framework/Table'
import { UpDownIcon } from '@frontend/framework/icons/UpDownIcon'
import { useState } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import type { LeaveDetail, LeaveEmployeeList } from '@frontend/types/leave'
import { formatDate } from '@frontend/framework/utils/date'
import { LeaveStatusButton } from '@components/LeavePage/LeaveStatusButton'
import { LeaveActionButton } from '@components/LeavePage/LeaveActionButton'
import { CheckLeaveCell } from '@components/LeavePage/CheckLeaveCell'
import { useCheckedLeaveDetail } from '@frontend/state/leave-params'
import { isEqual } from 'lodash'
import { LeaveDate } from '@components/LeavePage/LeaveDate'
import { LeaveUnitSelect } from '@components/LeavePage/LeaveUnitSelect'
import { LeaveActionSelectedButton } from '@components/LeavePage/LeaveActionSelectedButton'
type CreateHeaderInput = {
  headerText: string
  sortBy?: keyof LeaveDetail
}
const createHeader = ({ headerText, sortBy }: CreateHeaderInput) => {
  const Header = () => {
    const [sort, setSort] = useState({
      sortBy: 'employeeName',
      sortOrder: 'asc',
    })

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

export const LeaveTable = () => {
  const leaveFake: LeaveEmployeeList = [
    {
      id: 1,
      employeeName: 'Khang Nguyen',
      unitName: 'Team dev',
      applicationDate: new Date().toISOString(),
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      total: 1,
      status: 0,
    },
    {
      id: 2,
      employeeName: 'Gia Nguyen',
      unitName: 'Team dev',
      applicationDate: new Date().toISOString(),
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      total: 1,
      status: 1,
    },
    {
      id: 3,
      employeeName: 'Anh Bao',
      unitName: 'Team dev',
      applicationDate: new Date().toISOString(),
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      total: 1,
      status: 2,
    },
    {
      id: 4,
      employeeName: 'Khang Nguyen',
      unitName: 'Team dev',
      applicationDate: new Date().toISOString(),
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      total: 1,
      status: 0,
    },
    {
      id: 5,
      employeeName: 'Gia Nguyen',
      unitName: 'Team dev',
      applicationDate: new Date().toISOString(),
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      total: 1,
      status: 1,
    },
    {
      id: 6,
      employeeName: 'Anh Bao',
      unitName: 'Team dev',
      applicationDate: new Date().toISOString(),
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      total: 1,
      status: 2,
    },
  ]
  const allLeave = leaveFake.map((leave) => leave.id)
  const { checkedLeaveIds, setCheckedLeaveDetail } = useCheckedLeaveDetail()
  const columns: Column<LeaveDetail>[] = [
    {
      accessor: 'id',
      Header: (
        <Checkbox
          sx={{
            color: 'white',
          }}
          size="small"
          checked={isEqual(allLeave, checkedLeaveIds)}
          onChange={(e) => {
            if (e.target.checked) {
              setCheckedLeaveDetail(
                allLeave.reduce(
                  (acc, id, index) => ({
                    ...acc,
                    [index]: id,
                  }),
                  {} as Record<number, number>
                )
              )
            } else {
              setCheckedLeaveDetail({})
            }
          }}
        />
      ),
      Cell: CheckLeaveCell,
      width: 'w-[50px]',
    },
    {
      Header: createHeader({
        headerText: 'Employee',
        sortBy: 'employeeName',
      }),
      accessor: 'employeeName',
      Cell: ({ value }) => <p className="leading-loose">{value}</p>,
      width: 'w-[150px]',
    },

    {
      id: 'UnitCell',
      Header: createHeader({
        headerText: 'Unit',
        sortBy: 'unitName',
      }),
      accessor: 'unitName',
      Cell: ({ value }) => <p className="leading-loose">{value}</p>,
      width: 'w-[120px]',
    },
    {
      id: 'DateCell',
      Header: createHeader({
        headerText: 'Date of application',
        sortBy: 'applicationDate',
      }),
      accessor: 'applicationDate',
      Cell: ({ value }) => (
        <p className="leading-loose">{formatDate(value, 'MM/dd/yyyy')}</p>
      ),
      width: 'w-[150px]',
    },
    {
      id: 'FromDateCell',
      Header: createHeader({
        headerText: 'From Date',
        sortBy: 'fromDate',
      }),
      accessor: 'fromDate',
      Cell: ({ value }) => (
        <p className="leading-loose">{formatDate(value, 'MM/dd/yyyy')}</p>
      ),
      width: 'w-[120px]',
    },
    {
      id: 'ToDateCell',
      Header: createHeader({
        headerText: 'To Date',
        sortBy: 'toDate',
      }),
      accessor: 'toDate',
      Cell: ({ value }) => (
        <p className="leading-loose">{formatDate(value, 'MM/dd/yyyy')}</p>
      ),
      width: 'w-[120px]',
    },
    {
      id: 'Total',
      Header: createHeader({
        headerText: 'Total',
        sortBy: 'total',
      }),
      accessor: 'total',
      Cell: ({ value }) => <p className="leading-loose p-2">{value}</p>,
      width: 'w-[80px]',
    },
    {
      id: 'status',
      Header: createHeader({
        headerText: 'Status',
        sortBy: 'status',
      }),
      accessor: 'status',
      Cell: LeaveStatusButton,
      width: 'w-[80px]',
    },
    {
      id: 'action',
      Header: <header>Action</header>,
      accessor: 'id',
      Cell: LeaveActionButton,
      width: 'w-[50px]',
    },
  ]

  return (
    <div className="rounded px-10 py-5 flex flex-col">
      <div className="flex flex-row space-x-5 mb-5">
        <div>
          <LeaveDate />
        </div>
        <div className="w-60">
          <LeaveUnitSelect />
        </div>
        <LeaveActionSelectedButton />
      </div>
      <Table<LeaveDetail> data={leaveFake} columns={columns} rowCount={5} />
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
