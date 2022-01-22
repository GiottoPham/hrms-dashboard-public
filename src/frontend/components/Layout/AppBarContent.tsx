import { ButtonWithPopover } from '@frontend/framework/ButtonWithPopover'
import { useCurrentUser } from '@frontend/state/auth-queries'
import { Avatar, Button, IconButton } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import { useLogout } from '@frontend/state/auth-mutations'
import { useRouter } from 'next/router'
import LogoutIcon from '@mui/icons-material/Logout'
import { TextInput } from '@frontend/framework/TextInput'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

type AppBarContentProps = {
  renderHeader?: () => JSX.Element
}
export const AppBarContent = ({ renderHeader }: AppBarContentProps) => {
  const router = useRouter()

  const { currentUser } = useCurrentUser()
  // const { logout } = useLogout()
  const [searchInput, setSearchInput] = useState('')
  if (!currentUser?.user) return null
  return (
    <div className="flex justify-between items-center bg-primary h-full w-full px-6 font-nunito">
      <div>{renderHeader && renderHeader()}</div>
      <div className="w-1/3">
        <TextInput
          fullWidth
          id="search"
          name="search"
          placeholder="Search Employee"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            classes: {
              root: 'h-12 rounded-full font-nunito bg-white text-sm',
            },
            endAdornment: (
              <IconButton>
                <SearchIcon className="w-5 h-5" />
              </IconButton>
            ),
          }}
        />
      </div>
      {currentUser ? (
        <div className="flex items-center">
          <p className="font-bold text-secondary-600">
            {currentUser.user.fullName}
          </p>

          <ButtonWithPopover
            renderButton={({ openPopover }) => (
              <Button
                color="inherit"
                classes={{ root: 'ml-2 rounded-full' }}
                onClick={openPopover}
              >
                <Avatar classes={{ root: 'h-9 w-9 font-nunito bg-secondary' }}>
                  {currentUser.user.fullName[0]}
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
                <div className="w-32">
                  <Button
                    fullWidth
                    classes={{
                      root: 'h-10 text-sm normal-case justify-start pl-4 font-nunito text-secondary',
                    }}
                    onClick={() => {
                      // logout().finally(() => {
                      router.push('/login')
                      // })
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
