import type { ReactNode } from 'react'
import { SideBarNavigations } from './SideBarNavigations'
import { AppBarContent } from './AppBarContent'
import { APP_HEADER_HEIGHT, SIDEBAR_WIDTH } from './constants'
import ScreenImage from '../../../assets/images/Screen.jpg'
import Image from 'next/image'
import Head from 'next/head'

type LayoutProps = {
  children: ReactNode
  renderHeader?: () => JSX.Element
}

export const Layout = ({ children, renderHeader }: LayoutProps) => {
  return (
    <div className="min-h-screen w-full min-w-[1366px]">
      <Head>
        <title>NBN-HRMS Dashboard</title>
      </Head>
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
          paddingBottom: '50px',
        }}
        className="w-full bg-primary-200 overflow-y-auto relative min-h-screen"
      >
        <div className="relative h-full z-10">{children}</div>
        <div className="absolute bottom-0 flex flex-col justify-end">
          <Image src={ScreenImage} alt="picture-job" />
        </div>
      </main>
    </div>
  )
}
