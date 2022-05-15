import Link from 'next/link'
import cx from 'classnames'
import { SIDEBAR_NAVIGATIONS } from './constants'
import { ButtonWithPopover } from '@frontend/framework/ButtonWithPopover'
import { useRouter } from 'next/dist/client/router'
import { Button } from '@mui/material'
import { BurgerButton } from '@components/Layout/BurgerButton'
import { useCurrentUser } from '@frontend/state/auth-queries'

export const SideBarNavigations = () => {
  const { pathname } = useRouter()
  const { currentUser } = useCurrentUser()
  return (
    <div className="bg-secondary-600 h-full font-nunito flex flex-col">
      <div className="flex items-center justify-center">
        <BurgerButton />
      </div>

      <nav className="pt-4 flex-grow h-full">
        <ul className="flex flex-col h-full">
          {SIDEBAR_NAVIGATIONS.map(({ Icon, label, subNavs, href }) => {
            let isFocus = false
            if (pathname === '/' && href === '/') isFocus = true
            if (
              pathname !== '/' &&
              subNavs.some((nav) => nav.href?.includes(pathname))
            )
              isFocus = true
            return (
              <li
                key={label}
                className={cx('px-2 flex', {
                  'flex-grow': label === 'Payroll',
                  'hidden': label === 'Setting' && currentUser?.roleid === 2,
                })}
              >
                <div>
                  <ButtonWithPopover
                    renderButton={({ openPopover }) => (
                      <Button
                        color="inherit"
                        classes={{
                          root: 'min-w-min p-3 text-primary-400',
                        }}
                        aria-label={label}
                        onClick={openPopover}
                      >
                        <Icon
                          className={cx('w-6 h-6', {
                            'text-primary': isFocus,
                            'text-gray-500': !isFocus,
                          })}
                        />
                      </Button>
                    )}
                    renderPopover={({
                      Popover,
                      isPopoverOpen,
                      anchorEl,
                      closePopover,
                    }) => (
                      <Popover
                        PaperProps={{
                          elevation: 0,
                          classes: { root: 'mr-6 bg-transparent' },
                        }}
                        id="menu"
                        open={isPopoverOpen}
                        anchorEl={anchorEl}
                        onClose={closePopover}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <nav className="pl-3">
                          <ul className="p-2 bg-secondary-600 rounded-xl min-w-44">
                            {subNavs?.map(({ label, href }) => (
                              <li key={label}>
                                <Link href={href} passHref>
                                  <Button
                                    href={href}
                                    fullWidth
                                    classes={{
                                      root: cx(
                                        'font-nunito font-semibold hover:text-primary-400 focus:text-primary-400 normal-case justify-start rounded-lg text-sm h-10',
                                        {
                                          'text-gray-400': href !== pathname,
                                          'text-primary-400': href === pathname,
                                        }
                                      ),
                                    }}
                                  >
                                    {label}
                                  </Button>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </Popover>
                    )}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
