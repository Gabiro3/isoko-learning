// components/InviteButton.tsx
'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaCopy, FaCheck } from 'react-icons/fa' // Import the icons you need
import { Button } from '@/components/ui/button'

export default function InviteButton() {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Invitation link copied!')
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000) // Reset button state after 2 seconds
  }

  return (
    <Button
      className={`flex items-center space-x-2 border border-black ${isCopied ? 'bg-green-200 text-green-800' : 'bg-white text-black'} hover:bg-gray-100`}
      onClick={copyToClipboard}
    >
      {isCopied ? <FaCheck /> : <FaCopy />}
      <span>{isCopied ? 'Copied' : 'Copy Invitation'}</span>
    </Button>
  )
}
