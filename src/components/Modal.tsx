import { useEffect, useRef, useState, type ElementRef } from "react"
import { createPortal } from "react-dom"
import { Button } from "./Button"

export default function Modal() {
   const [isOpen, setIsOpen] = useState(true)
   const modalRef = useRef<null | ElementRef<"dialog">>(null)

   useEffect(() => {
      const modal = modalRef.current
      if (!modal) return
      isOpen ? modal.showModal() : modal.close()

      return () => {}
   }, [isOpen])

   return (
      isOpen &&
      createPortal(
         <dialog
            ref={modalRef}
            aria-modal={true}
            className="top-1/2 -translate-y-1/2 w-full rounded-lg sm:w-[60ch] mx-auto p-3 sm:p-8 grid gap-10"
         >
            <h1 className="uppercase text-3xl">Platform Support</h1>
            <p className="text-base">
               For best support run this app on Chrome for Android, on a mid to high-end smartphone.
               <br /> <br />
               Desktop users can enable emulation using IWER by pressing "win+alt+e" upon which an emulator will drop
               you into a simulation. After activating the "play-mode" you can use "shift+w/a/s/d" keys to move around.
               <br /> <br />
               In case your platform is not supported, you can choose the less imersive desktop version.
            </p>
            <Button autoFocus className="place-self-end" onClick={() => setIsOpen(false)}>
               I understand
            </Button>
         </dialog>,
         document.body
      )
   )
}
// focus-visible:ring-amber-300 focus-visible:ring-8
