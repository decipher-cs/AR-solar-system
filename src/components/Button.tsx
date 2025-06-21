import { type ComponentProps, type PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"
export const Button = ({ children, className, ...props }: PropsWithChildren<{} & ComponentProps<"button">>) => {
   console.log(className)
   return (
      <button
         type="button"
         className={twMerge(
            "text-white bg-gradient-to-br from-purple-600 focus:ring-0 focus:outline-0 to-blue-500 hover:bg-gradient-to-bl focus-visible:ring-4 focus-visible:ring-blue-300 dark:focus-visible:ring-blue-800 font-bold rounded-lg text-sm sm:text-md uppercase px-5 py-2.5 text-center me-2 mb-2 cursor-pointer",
            className
         )}
         {...props}
      >
         {children}
      </button>
   )
}
