import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Switch } from "@headlessui/react"
import { storage } from "@/utils/storage"
import { mm } from "@/utils/mm"

const themeStorageKey = "blog-theme"

const getTheme = (): "light" | "dark" => {
  try {
    return (storage.get(themeStorageKey) as "dark") || mm()
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
    setTheme(mode ?? "dark")
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
          setMode(v => (v === "light" ? "dark" : "light"))
        }}
        className="bg-slate-200 dark:bg-slate-700 z-10 relative flex justify-between items-center flex-shrink-0 h-8 w-16 px-1 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-5 h-5 absolute z-10 mx-1 transition-opacity ease-in-out duration-300 ${
            mode !== "light" ? "opacity-100" : "opacity-0"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>

        <span className="sr-only">Switch dark mode</span>
        <span
          aria-hidden="true"
          className={`bg-slate-100 dark:bg-slate-800 pointer-events-none inline-block h-5 w-5 absolute z-20 rounded-full shadow-lg transform ring-0 transition-transform ease-in-out duration-500 ${
            mode !== "light" ? "translate-x-8" : "translate-x-0"
          }`}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-5 h-5 absolute z-10 right-0 mx-1 transition-opacity ease-in-out duration-300 ${
            mode !== "light" ? "opacity-0" : "opacity-100"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      </Switch>
    </>
  )
}

export default ThemeSwitch
