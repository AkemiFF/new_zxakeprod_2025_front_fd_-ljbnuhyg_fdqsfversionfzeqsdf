import React from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function GoogleButton() {
  return (
    <Button variant="outline" className="w-full flex items-center justify-center">
      <Image
        src="/images/google.png"
        alt="Google logo"
        width={25}
        height={25}
        className="mr-2"
      />
      <span>Sign with Google</span>
    </Button>
  )
}
