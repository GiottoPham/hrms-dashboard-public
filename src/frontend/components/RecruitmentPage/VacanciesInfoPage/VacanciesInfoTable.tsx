import { Button, IconButton } from '@mui/material'
import type { Column } from 'react-table'
import { Table } from '@frontend/framework/Table'
import { UpDownIcon } from '@frontend/framework/icons/UpDownIcon'
import { useState } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { formatDate } from '@frontend/framework/utils/date'
import type {
  VacanciesInfo,
  VacanciesInfos,
} from '@frontend/types/vacancies-info'
import { VacanciesStatus } from '@components/RecruitmentPage/VacanciesInfoPage/VacanciesStatus'
import { CandidateVacanciesButton } from '@components/RecruitmentPage/VacanciesInfoPage/CandidateVacanciesButton'
import { RecruitmentIcon } from '@frontend/framework/icons/RecruitmentIcon'
import { EditVacanciesButton } from '@components/RecruitmentPage/VacanciesInfoPage/EditVacanciesButton'
import EditIcon from '@mui/icons-material/Edit'
import type { JobDetail } from '@frontend/types/job'
import type { Employee } from '@frontend/types/employee'
import type { PartialDeep } from 'type-fest'
import AddIcon from '@mui/icons-material/Add'

type CreateHeaderInput = {
  headerText: string
  sortBy?: keyof VacanciesInfo
}
const createHeader = ({ headerText, sortBy }: CreateHeaderInput) => {
  const Header = () => {
    const [sort, setSort] = useState({
      sortBy: 'id',
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

export const VacanciesInfoTable = () => {
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
  const LIST_UNIT = [
    {
      id: 1,
      name: 'CEO',
      type: 'head',
      peopleNumber: 20,
      description: 'abcxyz',
      headOfUnit: 'Pham Gia Nguyen',
    },
    {
      id: 2,
      name: 'ALO',
      type: 'sub-head',
      peopleNumber: 10,
      description: 'abcxyz',
      headOfUnit: 'Pham Khang Nguyen',
    },
    {
      id: 3,
      name: 'BLE',
      type: 'sub',
      peopleNumber: 5,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
    },
    {
      id: 4,
      name: 'BLE2',
      type: 'sub',
      peopleNumber: 5,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
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
    },
    {
      id: 7,
      name: 'CEO',
      type: 'sub-head',
      peopleNumber: 10,
      description: 'abcxyz',
      headOfUnit: 'Pham Khang Nguyen',
    },
    {
      id: 8,
      name: 'CEO',
      type: 'sub',
      peopleNumber: 5,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
    },
    {
      id: 9,
      name: 'CEO',
      type: 'sub',
      peopleNumber: 5,
      description: 'abcxyz',
      headOfUnit: 'Truong Anh Bao',
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
  const vacanciesFake: VacanciesInfos = [
    {
      id: 1,
      hiringManagerId: 1,
      jobId: 1,
      unitId: 1,
      publishedDate: new Date().toISOString(),
      expiredDate: new Date().toISOString(),
      quantity: '1',
      status: 0,
      postContent: '',
    },
    {
      id: 2,
      hiringManagerId: 1,
      jobId: 1,
      unitId: 1,
      publishedDate: new Date().toISOString(),
      expiredDate: new Date().toISOString(),
      quantity: '1',
      status: 0,
      postContent: '',
    },
    {
      id: 3,
      hiringManagerId: 1,
      jobId: 1,
      unitId: 1,
      publishedDate: new Date().toISOString(),
      expiredDate: new Date().toISOString(),
      quantity: '1',
      status: 0,
      postContent: '',
    },
    {
      id: 4,
      hiringManagerId: 1,
      jobId: 1,
      unitId: 1,
      publishedDate: new Date().toISOString(),
      expiredDate: new Date().toISOString(),
      quantity: '1',
      status: 2,
      postContent: '',
    },
    {
      id: 5,
      hiringManagerId: 1,
      jobId: 1,
      unitId: 1,
      publishedDate: new Date().toISOString(),
      expiredDate: new Date().toISOString(),
      quantity: '1',
      status: 1,
      postContent: '',
    },
  ]
  const columns: Column<VacanciesInfo>[] = [
    {
      accessor: 'id',
      Header: createHeader({
        headerText: 'Id',
        sortBy: 'id',
      }),
      Cell: ({ value }) => <p className="leading-loose">{value}</p>,
      width: 'w-[50px]',
    },
    {
      Header: createHeader({
        headerText: 'Hiring Manager',
        sortBy: 'hiringManagerId',
      }),
      accessor: 'hiringManagerId',
      Cell: ({ value }) => (
        <p className="leading-loose">
          {
            employeesFake.find((emp) => emp?.id === value)?.personalDetail
              ?.firstName
          }{' '}
          {
            employeesFake.find((emp) => emp?.id === value)?.personalDetail
              ?.lastName
          }
        </p>
      ),
      width: 'w-[150px]',
    },
    {
      id: 'JobCell',
      Header: createHeader({
        headerText: 'Job Title',
        sortBy: 'jobId',
      }),
      accessor: 'jobId',
      Cell: ({ value }) => (
        <p className="leading-loose">
          {jobFake.find((job) => job.id === value)?.title}
        </p>
      ),
      width: 'w-[150px]',
    },
    {
      id: 'UnitCell',
      Header: createHeader({
        headerText: 'Unit',
        sortBy: 'unitId',
      }),
      accessor: 'unitId',
      Cell: ({ value }) => (
        <p className="leading-loose">
          {LIST_UNIT.find((unit) => unit.id === value)?.name}
        </p>
      ),
      width: 'w-[120px]',
    },
    {
      id: 'ExpiredDateCell',
      Header: createHeader({
        headerText: 'Expired Date',
        sortBy: 'expiredDate',
      }),
      accessor: 'expiredDate',
      Cell: ({ value }) => (
        <p className="leading-loose">{formatDate(value, 'MM/dd/yyyy')}</p>
      ),
      width: 'w-[150px]',
    },
    {
      id: 'PublishedDateCell',
      Header: createHeader({
        headerText: 'Published Date',
        sortBy: 'publishedDate',
      }),
      accessor: 'publishedDate',
      Cell: ({ value }) => (
        <p className="leading-loose">{formatDate(value, 'MM/dd/yyyy')}</p>
      ),
      width: 'w-[120px]',
    },
    {
      id: 'Quantity',
      Header: createHeader({
        headerText: 'Quantity',
        sortBy: 'quantity',
      }),
      accessor: 'quantity',
      Cell: ({ value }) => <p className="leading-loose p-2">{value}</p>,
      width: 'w-[100px]',
    },
    {
      id: 'status',
      Header: createHeader({
        headerText: 'Status',
        sortBy: 'status',
      }),
      accessor: 'status',
      Cell: VacanciesStatus,
      width: 'w-[80px]',
    },
    {
      id: 'action',
      Header: <header>Action</header>,
      accessor: 'id',
      Cell: ({ value, row }) => (
        <div className="flex">
          {' '}
          <CandidateVacanciesButton
            id={value}
            renderButton={({ openModal }) => (
              <IconButton onClick={openModal}>
                <RecruitmentIcon className="w-5 h-5" />
              </IconButton>
            )}
          />
          <EditVacanciesButton
            isEdit={true}
            vacanciesInfo={row.original}
            renderButton={({ openModal }) => (
              <IconButton onClick={openModal}>
                <EditIcon className="w-5 h-5" />
              </IconButton>
            )}
          />
        </div>
      ),
      width: 'w-[100px]',
    },
  ]

  return (
    <div className="rounded px-10 py-5 flex flex-col">
      <EditVacanciesButton
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
      <Table<VacanciesInfo>
        data={vacanciesFake}
        columns={columns}
        rowCount={5}
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
