import { useEffect, useState, type ButtonHTMLAttributes, type ComponentProps, type PropsWithChildren } from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Scene, store } from "./Scene"
import GithubIcon from "./components/GithubIcon"

const Button = ({ children, className, ...props }: PropsWithChildren<{} & ComponentProps<"button">>) => {
   return (
      <button
         type="button"
         className={twMerge(
            "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus-visible:ring-4 focus-visible:ring-blue-300 dark:focus:ring-blue-800 font-bold rounded-lg text-sm sm:text-md uppercase px-5 py-2.5 text-center me-2 mb-2 cursor-pointer",
            className
         )}
         {...props}
      >
         {children}
      </button>
   )
}

export type Experience = "ar" | "browser"
function App() {
   const [experienceMode, setExperienceMode] = useState<Experience | null>(null)

   return (
      <main className="relative w-full min-h-svh bg-special bg-black text-white grid place-items-center">
         <div className={clsx("absolute inset-0 flex flex-col z-30")}>
            <Scene mode={experienceMode} />
         </div>

         <a
            href="https://github.com/decipher-cs/AR-solar-system"
            className="absolute right-1 top-2 z-50"
            target="_blank"
            aria-label="visit github"
         >
            <GithubIcon />
         </a>

         <div
            className={clsx(
               "p-5 sm:p-9 min-w-11/12 sm:min-w-1/2 min-h-1/2 grid glass absolute z-40",
               experienceMode && "hidden"
            )}
         >
            <Button
               onClick={() => {
                  setExperienceMode("browser")
               }}
            >
               View in browser
            </Button>
            <Button
               onClick={() => {
                  setExperienceMode("ar")
                  store.enterAR()
               }}
            >
               Enter AR mode
            </Button>
         </div>
      </main>
   )
}

export default App
