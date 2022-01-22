import type { ReactNode } from 'react'
import { SideBarNavigations } from './SideBarNavigations'
import { AppBarContent } from './AppBarContent'
import { APP_HEADER_HEIGHT, SIDEBAR_WIDTH } from './constants'

type LayoutProps = {
  children: ReactNode
  renderHeader?: () => JSX.Element
}

export const Layout = ({ children, renderHeader }: LayoutProps) => {
  return (
    <div className="min-h-screen w-full min-w-[1366px]">
      <header
        style={{ height: APP_HEADER_HEIGHT, paddingLeft: SIDEBAR_WIDTH }}
        className="fixed top-0 w-full z-40"
      >
        <AppBarContent renderHeader={renderHeader} />
      </header>

      <aside
        style={{ width: SIDEBAR_WIDTH }}
        className="fixed left-0 z-50 h-full"
      >
        <SideBarNavigations />
      </aside>

      <main
        style={{
          paddingTop: APP_HEADER_HEIGHT,
          paddingLeft: SIDEBAR_WIDTH,
        }}
        className="min-h-screen w-full bg-primary-100 relative"
      >
        {children}
      </main>
    </div>
  )
}
