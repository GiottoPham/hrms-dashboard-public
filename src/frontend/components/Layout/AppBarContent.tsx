import { ButtonWithPopover } from '@frontend/framework/ButtonWithPopover'
import { useCurrentUser } from '@frontend/state/auth-queries'
import { Avatar, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LogoutIcon from '@mui/icons-material/Logout'
import { useLogout } from '@frontend/state/auth-mutation'
import { roleFake } from '@components/UserManagementPage/UserManagementTable'
import cx from 'classnames'
type AppBarContentProps = {
  renderHeader?: () => JSX.Element
}
export const AppBarContent = ({ renderHeader }: AppBarContentProps) => {
  const { currentUser } = useCurrentUser()
  const { logout } = useLogout()
  if (!currentUser) return null
  return (
    <div className="flex justify-between items-center bg-primary h-full w-full px-6 font-nunito">
      <div>{renderHeader && renderHeader()}</div>
      <div className="w-1/3"></div>
      {currentUser ? (
        <div className="flex items-center">
          <div className="flex flex-col">
            <p className="font-bold text-secondary-600">
              {currentUser.username}
            </p>
            <p
              className={cx(
                'font-bold font-nunito bg-white py-1 rounded-lg text-xs text-center',
                {
                  'text-info': currentUser.roleid === 1,
                  'text-primary': currentUser.roleid === 2,
                  'text-danger': currentUser.roleid === 3,
                }
              )}
            >
              {roleFake.find((role) => role.id === currentUser.roleid)?.name}
            </p>
          </div>
          <ButtonWithPopover
            renderButton={({ openPopover }) => (
              <Button
                color="inherit"
                classes={{ root: 'ml-2 rounded-full' }}
                onClick={openPopover}
              >
                <Avatar classes={{ root: 'h-9 w-9 font-nunito bg-secondary' }}>
                  {currentUser.username[0]}
                </Avatar>

                <ExpandMoreIcon className="w-4 h-4 ml-2" />
              </Button>
            )}
            renderPopover={({
              anchorEl,
              isPopoverOpen,
              Popover,
              closePopover,
            }) => (
              <Popover
                disableScrollLock
                PaperProps={{
                  elevation: 0,
                  classes: {
                    root: 'shadow rounded border border-blue-200',
                  },
                }}
                id="menu"
                open={isPopoverOpen}
                anchorEl={anchorEl}
                onClose={closePopover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div className="w-28">
                  <Button
                    fullWidth
                    color="inherit"
                    classes={{
                      root: 'h-10 text-sm normal-case justify-start pl-4 font-nunito',
                    }}
                    onClick={() => {
                      logout()
                    }}
                  >
                    <LogoutIcon className="h-5 w-5" />
                    <span className="text-sm font-inter pl-2">Logout</span>
                  </Button>
                </div>
              </Popover>
            )}
          />
        </div>
      ) : (
        <div role="presentation" className="h-12"></div>
      )}
    </div>
  )
}
