import * as React from "react"
import ThemeSwitch from "./theme-switch"
import { ReactNode } from "react"
import SiteTitle from "./site-title"

interface Props {
  children: ReactNode
  location: Location
  title: string
}

const Layout = ({ location, title, children }: Props) => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-lg transition-colors ease-in-out duration-500">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <header className="flex justify-between items-center mb-10">
          <SiteTitle location={location} title={title} />
          <ThemeSwitch />
        </header>
        {children}
        <footer className="flex justify-between mt-12 pt-6">
          &copy; {new Date().getFullYear()} crossjs.com
        </footer>
      </div>
    </div>
  )
}

export default Layout
