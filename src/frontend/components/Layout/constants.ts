import { DashBoardIcon } from '@frontend/framework/icons/DashBoardIcon'
import { MonitorIcon } from '@frontend/framework/icons/MonitorIcon'
import { PimIcon } from '@frontend/framework/icons/PimIcon'
import { LeaveIcon } from '@frontend/framework/icons/LeaveIcon'
import { AttendanceIcon } from '@frontend/framework/icons/AttendanceIcon'
import { RecruitmentIcon } from '@frontend/framework/icons/RecruitmentIcon'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { SettingIcon } from '@frontend/framework/icons/SettingIcon'
/**
 * Layout Component
 */
export const APP_HEADER_HEIGHT = '64px'
export const SIDEBAR_WIDTH = '64px'
export const SIDEBAR_NAVIGATIONS = [
  {
    Icon: DashBoardIcon,
    label: 'Dashboard',
    href: '/',
    subNavs: [{ label: 'Dashboard', href: '/' }],
  },
  {
    Icon: MonitorIcon,
    label: 'Monitor',
    href: '',
    subNavs: [
      { label: 'User Management', href: '/monitor/user-management' },
      { label: 'Job', href: '/monitor/job' },
      { label: 'Organization', href: '/monitor/organization' },
    ],
  },
  {
    Icon: PimIcon,
    href: '',
    label: 'PIM',
    subNavs: [
      { label: 'Employees Info', href: '/pim/employees-info' },
      { label: 'Add Employee', href: '/pim/add-employee' },
    ],
  },
  {
    Icon: LeaveIcon,
    href: '/leave',
    label: 'Leave',
    subNavs: [{ label: 'Leave', href: '/leave' }],
  },
  {
    Icon: AttendanceIcon,
    href: '/attendance',
    label: 'Attendance',
    subNavs: [{ label: 'Attendance', href: '/attendance' }],
  },
  {
    Icon: RecruitmentIcon,
    href: '',
    label: 'Recruitment',
    subNavs: [
      { label: 'Vacancies Info', href: '/recruitment/vacancies-info' },
      { label: 'Candidate', href: '/recruitment/candidate' },
    ],
  },
  {
    Icon: AttachMoneyIcon,
    href: '/payroll',
    label: 'Payroll',
    subNavs: [{ label: 'Payroll', href: '/payroll' }],
  },
  {
    Icon: SettingIcon,
    label: 'Setting',
    href: '',
    subNavs: [
      { label: 'Location', href: '/setting/location' },
      { label: 'Shift', href: '/setting/shift' },
      { label: 'QR Code', href: '/qr' },
    ],
  },
]
