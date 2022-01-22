import { DashBoardIcon } from '@frontend/framework/icons/DashBoardIcon'
import { MonitorIcon } from '@frontend/framework/icons/MonitorIcon'
import { PimIcon } from '@frontend/framework/icons/PimIcon'
import { LeaveIcon } from '@frontend/framework/icons/LeaveIcon'
import { AttendanceIcon } from '@frontend/framework/icons/AttendanceIcon'
import { MyInfoIcon } from '@frontend/framework/icons/MyInfoIcon'
import { RecruitmentIcon } from '@frontend/framework/icons/RecruitmentIcon'
import { InsuranceIcon } from '@frontend/framework/icons/InsuranceIcon'
import TaskIcon from '@mui/icons-material/Task'
/**
 * Layout Component
 */
export const APP_HEADER_HEIGHT = '64px'
export const SIDEBAR_WIDTH = '64px'
export const SIDEBAR_NAVIGATIONS = () => [
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
      { label: 'Role', href: '/monitor/role' },
    ],
  },
  {
    Icon: PimIcon,
    href: '/pim',
    label: 'PIM',
    subNavs: [{ label: 'PIM', href: '/pim' }],
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
    href: '/recruitment',
    label: 'Recruitment',
    subNavs: [{ label: 'Recruitment', href: '/recruitment' }],
  },
  {
    Icon: TaskIcon,
    href: '/on-boarding',
    label: 'On-boarding',
    subNavs: [{ label: 'On-boarding', href: '/on-boarding' }],
  },
  {
    Icon: InsuranceIcon,
    href: '/insurance',
    label: 'Insurance',
    subNavs: [{ label: 'Insurance', href: '/insurance' }],
  },
  {
    Icon: MyInfoIcon,
    href: '/my-info',
    label: 'My Info',
    subNavs: [{ label: 'My Info', href: '/my-info' }],
  },
]
