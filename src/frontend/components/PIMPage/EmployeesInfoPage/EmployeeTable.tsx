import { Button, IconButton, Avatar } from '@mui/material'
import type { Column } from 'react-table'
import { Table } from '@frontend/framework/Table'
import EditIcon from '@mui/icons-material/Edit'
import { UpDownIcon } from '@frontend/framework/icons/UpDownIcon'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import type { Employee } from '@frontend/types/employee'
import { EditEmployeeButton } from '@components/PIMPage/EmployeesInfoPage/EditEmployeeButton'
import type { JobDetail } from '@frontend/types/job'
import type { PartialDeep } from 'type-fest'
import { useEmployeeParams } from '@frontend/state/employee-params'
import { useEmployees } from '@frontend/state/employee-queries'
import { useJobs } from '@frontend/state/job-queries'
import { useJobParams } from '@frontend/state/job-params'
import { useUnits } from '@frontend/state/unit-queries'
import type { Unit } from '@frontend/types/unit'

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
  const employeesFake: PartialDeep<Employee>[] = [
    {
      id: 1,
      personalDetail: {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        firstName: 'Nguyen',
        lastName: 'Pham',
        email: 'giotto2015.py@gmail.com',
        phone: '0854662633',
      },
      jobDetail: {
        jobId: 1,
        unitId: 2,
      },
    },
    {
      id: 2,
      personalDetail: {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        firstName: 'Nguyen',
        lastName: 'Pham',
        email: 'giotto2015.py@gmail.com',
        phone: '0854662633',
      },
      jobDetail: {
        jobId: 1,
        unitId: 2,
      },
    },
    {
      id: 3,
      personalDetail: {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        firstName: 'Nguyen',
        lastName: 'Pham',
        email: 'giotto2015.py@gmail.com',
        phone: '0854662633',
      },
      jobDetail: {
        jobId: 1,
        unitId: 2,
      },
    },
    {
      id: 4,
      personalDetail: {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        firstName: 'Nguyen',
        lastName: 'Pham',
        email: 'giotto2015.py@gmail.com',
        phone: '0854662633',
      },
      jobDetail: {
        jobId: 1,
        unitId: 2,
      },
    },
    {
      id: 5,
      personalDetail: {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        firstName: 'Nguyen',
        lastName: 'Pham',
        email: 'giotto2015.py@gmail.com',
        phone: '0854662633',
      },
      jobDetail: {
        jobId: 1,
        unitId: 2,
      },
    },
  ]
  const jobFake: JobDetail[] = [
    {
      id: 1,
      title: 'Art Director',
      description:
        'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
      note: 'abc',
    },
    {
      id: 2,
      title: 'Art Director',
      description:
        'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
      note: 'abc',
    },

    {
      id: 3,
      title: 'Art Director',
      description:
        'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
      note: 'abc',
    },
    {
      id: 4,
      title: 'Art Director',
      description:
        'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
      note: 'abc',
    },
    {
      id: 5,
      title: 'Art Director',
      description:
        'Art directors typically oversee the work of other designers and artists who produce images for television, film, live performances, advertisements, or video games. They determine the overall style in which a message is communicated visually to its audience.',
      note: 'abc',
    },
  ]
  const LIST_UNIT: Unit[] = [
    {
      id: 1,
      name: 'CEO',
      type: 'head',
      peopleNumber: 20,
      description: 'abcxyz',
      headOfUnit: 'Pham Gia Nguyen',
      subUnit: null,
    },
    {
      id: 2,
      name: 'ALO',
      type: 'sub-head',
      peopleNumber: 10,
      description: 'abcxyz',
      headOfUnit: 'Pham Khang Nguyen',
      subUnit: null,
    },
    {
      id: 3,
      name: 'BLE',
      type: 'sub',
      peopleNumber: 5,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
      subUnit: null,
    },
    {
      id: 4,
      name: 'BLE2',
      type: 'sub',
      peopleNumber: 5,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
      subUnit: null,
    },

    {
      id: 5,
      name: 'ALO2',
      subUnit: null,
      type: 'sub-head',
      peopleNumber: 10,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
    },

    {
      id: 6,
      name: 'CEO',
      type: 'head',
      peopleNumber: 20,
      description: 'abcxyz',
      headOfUnit: 'Pham Gia Nguyen',
      subUnit: null,
    },
    {
      id: 7,
      name: 'CEO',
      type: 'sub-head',
      peopleNumber: 10,
      description: 'abcxyz',
      headOfUnit: 'Pham Khang Nguyen',
      subUnit: null,
    },
    {
      id: 8,
      name: 'CEO',
      type: 'sub',
      peopleNumber: 5,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
      subUnit: null,
    },
    {
      id: 9,
      name: 'CEO',
      type: 'sub',
      peopleNumber: 5,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
      subUnit: null,
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
  ]
  const { employeeParams } = useEmployeeParams()
  const { employees = employeesFake, isLoading: employeeLoading } =
    useEmployees(employeeParams)
  const { jobParams } = useJobParams()
  const { jobs = jobFake, isLoading: jobLoading } = useJobs(jobParams)
  const { units = LIST_UNIT, isLoading: unitLoading } = useUnits(false)
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
      Header: createHeader({ headerText: 'Unit', sortBy: 'unitId' }),
      accessor: 'jobDetail',
      Cell: ({ value }) => (
        <p>{units.find((unit) => unit.id === value?.unitId)?.name}</p>
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
      Cell: ({ value }) => (
        <div className="flex justify-end">
          <EditEmployeeButton
            employeeId={value as number}
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
