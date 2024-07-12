"use client"
import { Button } from "../ui/button"
import Image from "next/image"

interface SubmitButtonProps {  
  className?: string
  children: React.ReactNode
  isLoading: boolean
}

const SubmitButton = (
  { className, children, isLoading }: SubmitButtonProps,
) => {
 
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className=" flex items-center gap-4">
          {/* <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          /> */}
          loading ....
        </div>
      ): (
          children
      )}
    </Button>
  )
}

export default SubmitButton