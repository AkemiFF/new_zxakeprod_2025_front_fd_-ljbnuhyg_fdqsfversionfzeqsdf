import React from 'react'

interface WaitSpinnerProps {
  visible: boolean
}

export default function WaitSpinner({ visible }: WaitSpinnerProps) {
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
    </div>
  )
}

