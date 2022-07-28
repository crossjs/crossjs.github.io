import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Switch } from "@headlessui/react"
import { MoonIcon, SunIcon } from "@heroicons/react/outline"
import { storage } from "@/utils/storage"
import { mm } from "@/utils/mm"

const themeStorageKey = "blog-theme"

const getTheme = (): "light" | "dark" => {
  try {
    return storage.get(themeStorageKey) as "dark" || mm()
  } catch (err) {
    console.error(err)
  }

  return "dark"
}

const setTheme = (mode: "light" | "dark"): void => {
  try {
    storage.set(themeStorageKey, mode)
    document.documentElement.classList.toggle("dark", mode === "dark")
  } catch (err) {
    console.error(err)
  }
}

const ThemeSwitch = () => {
  const [mode, setMode] = useState<"light" | "dark" | null>(null)

  useEffect(() => {
    setMode(getTheme())
  }, [])

  useEffect(() => {
    setTheme(mode ?? 'dark')
  }, [mode])

  return (
    <>
      <Helmet>
        <script>
          {`document.documentElement.classList.toggle('dark', (localStorage.getItem('${themeStorageKey}') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark')`}
        </script>
      </Helmet>
      <Switch
        checked={mode !== "light"}
        onChange={() => {
          setMode((v) => v === "light" ? "dark" : "light")
        }}
        className="bg-slate-200 dark:bg-slate-700 z-10 relative flex justify-between items-center flex-shrink-0 h-8 w-16 px-1 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75"
      >
        <MoonIcon
          className={`w-5 h-5 absolute z-10 mx-1 transition-opacity ease-in-out duration-300 ${
            mode !== "light" ? "opacity-100" : "opacity-0"
          }`}
        />
        <span className="sr-only">Switch dark mode</span>
        <span
          aria-hidden="true"
          className={`bg-slate-100 dark:bg-slate-800 pointer-events-none inline-block h-5 w-5 absolute z-20 rounded-full shadow-lg transform ring-0 transition-transform ease-in-out duration-500 ${
            mode !== "light" ? "translate-x-8" : "translate-x-0"
          }`}
        />
        <SunIcon
          className={`w-5 h-5 absolute z-10 right-0 mx-1 transition-opacity ease-in-out duration-300 ${
            mode !== "light" ? "opacity-0" : "opacity-100"
          }`}
        />
      </Switch>
    </>
  )
}

export default ThemeSwitch
