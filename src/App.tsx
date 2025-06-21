import { useState } from "react"
import { clsx } from "clsx"
import { Scene, store } from "./Scene"
import GithubIcon from "./components/GithubIcon"
import { Button } from "./components/Button"
import CloseIcon from "./components/CloseIcon"
import Modal from "./components/Modal"

export type Experience = "ar" | "browser" | "undecided"

function App() {
   const [experienceMode, setExperienceMode] = useState<Experience>("undecided")

   return (
      <main className="relative w-full min-h-svh bg-special bg-black text-white grid place-items-center">
         <Modal />

         <div className={clsx("absolute inset-0 flex flex-col z-30", experienceMode === "undecided" && "blur-sm")}>
            <Scene mode={experienceMode} endHandler={() => setExperienceMode("undecided")} />
         </div>

         <div className="absolute right-1 top-2 z-50 flex gap-2">
            <a
               href="https://github.com/decipher-cs/AR-solar-system"
               className=""
               target="_blank"
               aria-label="visit github"
            >
               <GithubIcon />
            </a>
            <Button
               className={clsx(experienceMode !== "browser" && "hidden", " p-0 rounded-full")}
               onClick={() => setExperienceMode("undecided")}
            >
               <CloseIcon />
            </Button>
         </div>

         {experienceMode === "ar" ? (
            <p className="bg-white text-black p-3 sm:text-lg sm:p-8 mx-1 max-w-[50ch] rounded-3xl absolute z-50">
               If you are seeing this message your device is not fully supported.
               <br /> <br />
               You might have forgotten to turn on the emulator before entering AR mode. This step is necessary if your
               desktop does not support webXR. Refresh the page and enable emulation using IWER by pressing "Win + Alt +
               E" and only then enter AR mode. Also make sure to enable "play-mode" in the emulator if you want to move
               around.
               <br /> <br />
               If you are on mobile then view the browser version of the app.
            </p>
         ) : null}

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
