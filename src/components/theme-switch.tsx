import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Switch } from "@headlessui/react"
import { MoonIcon, SunIcon } from "@heroicons/react/outline"

const themeStorageKey = "blog-theme"

const getTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "dark"
  return localStorage.getItem(themeStorageKey) as "dark" || (window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light")
}

const setTheme = (mode: "light" | "dark"): void => {
  try {
    localStorage.setItem(themeStorageKey, mode)
    document.documentElement.classList.toggle("dark", mode === "dark")
  } catch (err) {
    console.error(err)
  }
}

const ThemeSwitch = () => {
  const [mode, setMode] = useState(getTheme())

  useEffect(() => {
    setTheme(mode)
  }, [mode])

  return (
    <>
      <Helmet>
        <script>
          {`document.documentElement.classList.toggle('dark', (localStorage.getItem('${themeStorageKey}') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark')`}
        </script>
      </Helmet>
      <Switch
        checked={mode === "dark"}
        onChange={() => {
          setMode((v) => v === "dark" ? "light" : "dark")
        }}
        className="bg-slate-200 dark:bg-slate-700 z-10 relative flex justify-between items-center flex-shrink-0 h-8 w-16 px-1 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75"
      >
        <MoonIcon
          className={`w-5 h-5 absolute z-10 mx-1 transition-opacity ease-in-out duration-300 ${
            mode === "dark" ? "opacity-1" : "opacity-0"
          }`}
        />
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`bg-slate-100 dark:bg-slate-800 pointer-events-none inline-block h-5 w-5 absolute z-20 rounded-full shadow-lg transform ring-0 transition-transform ease-in-out duration-500 ${
            mode === "dark" ? "translate-x-8" : "translate-x-0"
          }`}
        />
        <SunIcon
          className={`w-5 h-5 absolute z-10 right-0 mx-1 transition-opacity ease-in-out duration-300 ${
            mode !== "dark" ? "opacity-1" : "opacity-0"
          }`}
        />
      </Switch>
    </>
  )
}

export default ThemeSwitch
