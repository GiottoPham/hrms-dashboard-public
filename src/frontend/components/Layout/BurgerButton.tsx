import Link from 'next/link'
import cx from 'classnames'
import { ButtonWithCollapse } from '@frontend/framework/ButtonWithCollapse'
import { Button, IconButton } from '@mui/material'
import { ButtonWithDrawer } from '@frontend/framework/ButtonWithDrawer'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Close from '@mui/icons-material/Close'
import { useRouter } from 'next/dist/client/router'
import MenuIcon from '@mui/icons-material/Menu'
import { SIDEBAR_NAVIGATIONS, APP_HEADER_HEIGHT } from './constants'
import { MiniLogoIcon } from '@frontend/framework/icons/MiniLogoIcon'

export const BurgerButton = () => {
  const { pathname } = useRouter()

  return (
    <ButtonWithDrawer
      renderButton={({ openDrawer }) => (
        <Button
          fullWidth
          aria-label="Open expanded menu"
          color="inherit"
          style={{ height: APP_HEADER_HEIGHT }}
          classes={{
            root: 'rounded-none hover:text-primary-400 text-gray-500',
          }}
          onClick={openDrawer}
        >
          <MenuIcon className="w-7 h-7" />
        </Button>
      )}
      renderDrawer={({ Drawer, isDrawerOpen, closeDrawer }) => (
        <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
          <div className="bg-secondary-600 h-full w-72 overflow-y-auto flex flex-col">
            <header className="relative flex items-center px-5 py-2">
              <Link href="/" passHref>
                <MiniLogoIcon className="" />
              </Link>

              <IconButton
                classes={{ root: 'absolute right-1 top-1' }}
                onClick={closeDrawer}
              >
                <Close className="h-6 w-6 hover:text-primary text-gray-500" />
              </IconButton>
            </header>

            <nav className="px-1 py-4 flex-grow h-full">
              <ul className="flex flex-col h-full">
                {SIDEBAR_NAVIGATIONS.map(({ Icon, label, href, subNavs }) => {
                  if (subNavs.length <= 1) {
                    return (
                      <li
                        key={label}
                        className={cx({ 'flex-grow': label === 'Payroll' })}
                      >
                        <Link href={href} passHref>
                          <Button
                            fullWidth
                            href={href}
                            classes={{
                              root: cx(
                                'font-nunito font-semibold hover:text-primary-400 focus:text-primary-400 normal-case justify-between rounded-lg text-sm h-12 pl-4',
                                {
                                  'text-primary-400': pathname === href,
                                  'text-gray-500': pathname !== href,
                                }
                              ),
                            }}
                          >
                            <span className="flex items-center">
                              <Icon className="w-6 h-6 " />
                              <span className="pl-3 hover:text-primary-400">
                                {label}
                              </span>
                            </span>
                          </Button>
                        </Link>
                      </li>
                    )
                  } else {
                    let isFocus = true
                    if (pathname === '/' && href === '/') isFocus = false
                    if (
                      pathname !== '/' &&
                      subNavs.some((nav) => nav.href?.includes(pathname))
                    )
                      isFocus = false
                    return (
                      <li key={label}>
                        <ButtonWithCollapse
                          isInitialCollapse={isFocus}
                          renderButton={({ isCollapsed, toggleCollapse }) => (
                            <Button
                              fullWidth
                              href={href}
                              classes={{
                                root: cx(
                                  'font-nunito font-semibold hover:text-primary-400 focus:text-primary-400 normal-case justify-between rounded-lg text-sm h-12 pl-4',
                                  {
                                    'text-gray-500': isCollapsed,
                                    'text-primary-400': !isCollapsed,
                                  }
                                ),
                              }}
                              onClick={toggleCollapse}
                            >
                              <span className="flex items-center">
                                <Icon className="w-6 h-6" />
                                <span className="pl-3">{label}</span>
                              </span>

                              {isCollapsed ? (
                                <KeyboardArrowUpIcon className="h-5 w-5" />
                              ) : (
                                <KeyboardArrowDownIcon className="h-5 w-5" />
                              )}
                            </Button>
                          )}
                          renderCollapse={({ Collapse, isCollapsed }) => (
                            <Collapse
                              in={!isCollapsed}
                              timeout="auto"
                              unmountOnExit
                            >
                              <ul>
                                {subNavs.map(({ label, href }) => (
                                  <li key={label}>
                                    <Link href={href} passHref>
                                      <Button
                                        fullWidth
                                        href={href}
                                        classes={{
                                          root: cx(
                                            'font-nunito font-semibold hover:text-primary-400 focus:text-primary-400 normal-case justify-between rounded-lg text-sm h-12 pl-16',
                                            {
                                              'text-gray-500':
                                                href !== pathname,
                                              'text-primary-400':
                                                href === pathname,
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
                            </Collapse>
                          )}
                        />
                      </li>
                    )
                  }
                })}
              </ul>
            </nav>
          </div>
        </Drawer>
      )}
    />
  )
}
