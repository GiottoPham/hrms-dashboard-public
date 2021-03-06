import { Button, IconButton, Avatar, InputLabel } from '@mui/material'
import type { Column } from 'react-table'
import { Table } from '@frontend/framework/Table'
import { UpDownIcon } from '@frontend/framework/icons/UpDownIcon'
import { useState } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import type { Employee } from '@frontend/types/employee'
import type { PartialDeep } from 'type-fest'
import { useShowPayroll } from '@frontend/state/show-payroll'
import { usePayrollParams } from '@frontend/state/payroll-params'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { EmployeePayroll } from '@components/PayrollPage/EmployeePayroll'
import cx from 'classnames'
import { MonthPayrollFilter } from '@components/PayrollPage/MonthPayrollFilter'
import { useEmployeeParams } from '@frontend/state/employee-params'
import { useEmployees } from '@frontend/state/employee-queries'
import { useUnits } from '@frontend/state/unit-queries'
import { usePayrollPdf } from '@frontend/state/payroll-queries'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import DownloadIcon from '@mui/icons-material/Download'
import { TextInput } from '@frontend/framework/TextInput'
import { SearchOutlined } from '@mui/icons-material'
type CreateHeaderInput = {
  headerText: string
  sortBy?: keyof Employee['personalDetail'] | 'id' | keyof Employee['jobDetail']
}

const createHeader = ({ headerText, sortBy }: CreateHeaderInput) => {
  const Header = () => {
    const [sort, setSort] = useState<{
      sortBy?:
        | keyof Employee['personalDetail']
        | 'id'
        | keyof Employee['jobDetail']
      sortOrder: string
    }>({ sortBy: 'id', sortOrder: 'asc' })

    return (
      <header className="flex items-center">
        {headerText}
        {sortBy && (
          <IconButton
            classes={{ root: 'p-1 w-8 h-8' }}
            onClick={() => {
              if (sort.sortOrder === 'asc')
                setSort((prev) => ({
                  ...prev,
                  sortBy: sortBy,
                  sortOrder: 'desc',
                }))
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
        )}
      </header>
    )
  }

  return Header
}

export const PayrollTable = () => {
  const { showPayroll, setShowPayroll } = useShowPayroll()
  const { setPayrollParams, payrollParams } = usePayrollParams()
  const { employeeParams } = useEmployeeParams()
  const { employees = [], isLoading: employeeLoading } =
    useEmployees(employeeParams)
  const { units = [], isLoading: unitLoading } = useUnits(false)
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
        <p className="truncate">
          {value?.firstName || ''} {value?.lastName || ''}
        </p>
      ),
      width: 'w-[150px]',
    },
    {
      id: 'Unit',
      Header: createHeader({ headerText: 'Unit', sortBy: 'departmentId' }),
      accessor: 'jobDetail',
      Cell: ({ value }) => (
        <p className="truncate">
          {units.find((unit) => unit.id === value?.departmentId)?.name}
        </p>
      ),
      width: 'w-[150px]',
    },
    {
      id: 'email',
      Header: createHeader({ headerText: 'Email', sortBy: 'email' }),
      accessor: 'personalDetail',
      Cell: ({ value }) => <p className="truncate">{value?.email || ''}</p>,
      width: 'w-[250px]',
    },
    {
      id: 'phone',
      Header: createHeader({ headerText: 'Contact', sortBy: 'phone' }),
      accessor: 'personalDetail',
      Cell: ({ value }) => (
        <p>
          {value?.phone ? formatPhoneNumberIntl(value.phone) || '--' : '--'}
        </p>
      ),
      width: 'w-[150px]',
    },
    {
      id: 'actionCell',
      accessor: 'id',
      Cell: ({ value }) => (
        <div className="flex justify-end">
          <IconButton
            onClick={() => {
              setPayrollParams((prev) => ({
                ...prev!,
                employeeId: value as number,
              }))
              setShowPayroll(!showPayroll)
            }}
          >
            <RemoveRedEyeIcon className="w-5 h-5 text-black" />
          </IconButton>
        </div>
      ),
      width: 'w-[50px]',
    },
  ]
  const { payrollPdf, isLoading: pdfLoading } = usePayrollPdf(
    payrollParams.month
  )
  const [empName, setEmpName] = useState('')
  return (
    <div className="rounded px-10 py-5 flex flex-col w-full justify-center">
      <div className="flex space-x-3 items-end mb-5">
        <div className="w-50">
          <MonthPayrollFilter />
        </div>
        <div className="w-50 flex flex-col">
          <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
            Search Employee
          </InputLabel>
          <TextInput
            fullWidth
            id="empName"
            variant="outlined"
            placeholder="Employee name, email or contact"
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm',
              },
              startAdornment: <SearchOutlined className="mr-2 text-gray-500" />,
            }}
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
          />
        </div>
        <Button
          href={payrollPdf}
          classes={{
            root: 'bg-white h-10 normal-case font-bold rounded-lg border-2 w-20',
          }}
          variant="outlined"
          startIcon={<DownloadIcon className="w-5 h-5" />}
          disabled={pdfLoading}
        >
          PDF
        </Button>
      </div>

      <div className="flex space-x-5">
        <div
          className={cx(
            'overflow-auto flex flex-col transition-width duration-300 ease-in-out flex-shrink-0',
            {
              'w-5/12': showPayroll,
              'w-full': !showPayroll,
            }
          )}
        >
          <Table<PartialDeep<Employee>>
            data={
              employees?.filter((emp) =>
                (
                  emp.personalDetail.firstName +
                  ' ' +
                  emp.personalDetail.lastName +
                  ' ' +
                  emp.personalDetail.email +
                  ' ' +
                  emp.personalDetail.phone
                )
                  .toLowerCase()
                  .includes(empName.toLowerCase())
              ) as Employee[]
            }
            columns={columns}
            rowCount={5}
            isLoading={employeeLoading || unitLoading}
            selectedRowIndex={employees
              ?.filter((emp) =>
                (
                  emp.personalDetail.firstName +
                  ' ' +
                  emp.personalDetail.lastName +
                  ' ' +
                  emp.personalDetail.email +
                  ' ' +
                  emp.personalDetail.phone
                )
                  .toLowerCase()
                  .includes(empName.toLowerCase())
              )
              .findIndex(
                (item) => item.id === payrollParams.employeeId && showPayroll
              )}
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
        {showPayroll && <EmployeePayroll />}
      </div>
    </div>
  )
}
