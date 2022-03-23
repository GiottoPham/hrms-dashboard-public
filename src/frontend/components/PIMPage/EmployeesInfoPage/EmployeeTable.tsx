import { Button, IconButton, Avatar } from '@mui/material'
import type { Column } from 'react-table'
import { Table } from '@frontend/framework/Table'
import EditIcon from '@mui/icons-material/Edit'
import { UpDownIcon } from '@frontend/framework/icons/UpDownIcon'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import type { Employee } from '@frontend/types/employee'
import { EditEmployeeButton } from '@components/PIMPage/EmployeesInfoPage/EditEmployeeButton'
import type { PartialDeep } from 'type-fest'
import { useEmployeeParams } from '@frontend/state/employee-params'
import { useEmployees } from '@frontend/state/employee-queries'
import { useJobs } from '@frontend/state/job-queries'
import { useJobParams } from '@frontend/state/job-params'
import { useUnits } from '@frontend/state/unit-queries'

type CreateHeaderInput = {
  headerText: string
  sortBy?: keyof Employee['personalDetail'] | 'id' | keyof Employee['jobDetail']
}

const createHeader = ({ headerText, sortBy }: CreateHeaderInput) => {
  const Header = () => {
    const {
      employeeParams: { sort },
      setEmployeeParams,
    } = useEmployeeParams()

    return (
      <header className="flex items-center">
        {headerText}
        {sortBy && (
          <IconButton
            classes={{ root: 'p-1 w-8 h-8' }}
            onClick={() => {
              if (sort.sortBy === sortBy) {
                if (sort.sortOrder === 'asc') {
                  setEmployeeParams((prev) => ({
                    ...prev!,
                    sort: { ...sort, sortOrder: 'desc' },
                  }))
                } else
                  setEmployeeParams((prev) => ({
                    ...prev!,
                    sort: { ...sort, sortOrder: 'asc' },
                  }))
              } else {
                setEmployeeParams((prev) => ({
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
        )}
      </header>
    )
  }

  return Header
}

export const EmployeeTable = () => {
  const { employeeParams } = useEmployeeParams()
  const { employees = [], isLoading: employeeLoading } =
    useEmployees(employeeParams)
  const { jobParams } = useJobParams()
  const { jobs = [], isLoading: jobLoading } = useJobs(jobParams)
  const { units, isLoading: unitLoading } = useUnits(false)
  const columns: Column<PartialDeep<Employee>>[] = [
    {
      Header: createHeader({ headerText: 'ID', sortBy: 'id' }),
      accessor: 'id',
      Cell: ({ value }) => <p>{value}</p>,
      width: 'w-[68px]',
    },
    {
      id: 'avatar',
      Header: createHeader({ headerText: 'Avatar' }),
      accessor: 'personalDetail',
      Cell: ({ value }) => (
        <Avatar
          classes={{ root: 'h-8 w-8 text-lg bg-primary' }}
          alt={value?.firstName}
          src={value?.avatar || ''}
        />
      ),
      width: 'w-[68px]',
    },
    {
      id: 'name',
      Header: createHeader({ headerText: 'Name', sortBy: 'firstName' }),
      accessor: 'personalDetail',
      Cell: ({ value }) => (
        <p>
          {value?.firstName || ''} {value?.lastName || ''}
        </p>
      ),
      width: 'w-[250px]',
    },
    {
      id: 'jobTitle',
      Header: createHeader({ headerText: 'Job Title', sortBy: 'jobId' }),
      accessor: 'jobDetail',
      Cell: ({ value }) => (
        <p>{jobs.find((job) => job.id === value?.jobId)?.title}</p>
      ),
      width: 'w-[250px]',
    },
    {
      id: 'Unit',
      Header: createHeader({ headerText: 'Unit', sortBy: 'departmentId' }),
      accessor: 'jobDetail',
      Cell: ({ value }) => (
        <p>{units?.find((unit) => unit.id === value?.departmentId)?.name}</p>
      ),
      width: 'w-[250px]',
    },
    {
      id: 'email',
      Header: createHeader({ headerText: 'Email', sortBy: 'email' }),
      accessor: 'personalDetail',
      Cell: ({ value }) => <p>{value?.email || ''}</p>,
      width: 'w-[250px]',
    },
    {
      id: 'phone',
      Header: createHeader({ headerText: 'Contact', sortBy: 'phone' }),
      accessor: 'personalDetail',
      Cell: ({ value }) => <p>{value?.phone || ''}</p>,
      width: 'w-[150px]',
    },
    {
      id: 'actionCell',
      accessor: 'id',
      Cell: ({ row }) => (
        <div className="flex justify-end">
          <EditEmployeeButton
            employee={row.original as Employee}
            renderButton={({ openModal }) => (
              <IconButton onClick={openModal}>
                <EditIcon className="w-5 h-5" />
              </IconButton>
            )}
          ></EditEmployeeButton>
        </div>
      ),
      width: 'w-[50px]',
    },
  ]
  return (
    <div className="rounded px-10 py-10 flex flex-col">
      <Table<PartialDeep<Employee>>
        data={employees}
        columns={columns}
        rowCount={5}
        isLoading={jobLoading && employeeLoading && unitLoading}
      />
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
