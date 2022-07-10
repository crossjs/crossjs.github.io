import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { Switch } from "@headlessui/react"
import { MoonIcon, SunIcon } from "@heroicons/react/outline"

const themeStorageKey = "blog-theme"

const getTheme = (): string => {
  if (typeof window === "undefined") return "dark"
  return localStorage.getItem(themeStorageKey) || "dark"
}

const setLightMode = (): void => {
  try {
    localStorage.setItem(themeStorageKey, "light")
    document.documentElement.classList.remove("dark")
  } catch (err) {
    console.error(err)
  }
}

const setDarkMode = (): void => {
  try {
    localStorage.setItem(themeStorageKey, "dark")
    document.documentElement.classList.add("dark")
  } catch (err) {
    console.error(err)
  }
}

const ThemeSwitch = () => {
  const [isDark, toggleDark] = useState(getTheme() === "dark")
  const changeTheme = () => {
    toggleDark(!isDark)
    if (isDark) {
      setLightMode()
    } else {
      setDarkMode()
    }
  }
  return (
    <>
      <Helmet>
        <script>{`
          if (localStorage.getItem('${themeStorageKey}') === 'dark' || (!('${themeStorageKey}' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        `}</script>
      </Helmet>
      <Switch
        checked={isDark}
        onChange={changeTheme}
        className="bg-slate-200 dark:bg-slate-700 z-10 relative flex justify-between items-center flex-shrink-0 h-8 w-16 px-1 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75"
      >
        <MoonIcon
          className={`w-5 h-5 absolute z-10 mx-1 transition-opacity ease-in-out duration-300 ${
            isDark ? "opacity-1" : "opacity-0"
          }`}
        />
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`bg-slate-100 dark:bg-slate-800 pointer-events-none inline-block h-5 w-5 absolute z-20 rounded-full shadow-lg transform ring-0 transition-transform ease-in-out duration-500 ${
            isDark ? "translate-x-8" : "translate-x-0"
          }`}
        />
        <SunIcon
          className={`w-5 h-5 absolute z-10 right-0 mx-1 transition-opacity ease-in-out duration-300 ${
            !isDark ? "opacity-1" : "opacity-0"
          }`}
        />
      </Switch>
    </>
  )
}

export default ThemeSwitch
