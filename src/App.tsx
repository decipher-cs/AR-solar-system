import { useState } from "react"
import { clsx } from "clsx"
import { Scene, store } from "./Scene"
import GithubIcon from "./components/GithubIcon"
import { Button } from "./components/Button"

export type Experience = "ar" | "browser" | "undecided"

function App() {
   const [experienceMode, setExperienceMode] = useState<Experience>("undecided")

   return (
      <main className="relative w-full min-h-svh bg-special bg-black text-white grid place-items-center">
         <div className={clsx("absolute inset-0 flex flex-col z-30", experienceMode === "undecided" && "blur-sm")}>
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
               "p-5 sm:p-9 min-w-11/12 sm:min-w-1/2 min-h-1/2 glass absolute z-40",
               experienceMode === "undecided" ? "grid" : "hidden"
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
