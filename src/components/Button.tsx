import { type ComponentProps, type PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"
export const Button = ({ children, className, ...props }: PropsWithChildren<{} & ComponentProps<"button">>) => {
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
