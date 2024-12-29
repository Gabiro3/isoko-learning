'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

type CourseEnrollButtonProps = {
  userId: string
  courseId: string
}

export default function CourseEnrollButton({ userId, courseId }: CourseEnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter() // Use Next.js router for navigation

  const onClick = async () => {
    try {
      setIsLoading(true)

      if (!userId || !courseId) {
        throw new Error('User ID or Course ID is missing')
      }

      // Make a request to the API
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, courseId }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(result.message)
        router.refresh()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button className="w-full md:w-auto" size="sm" onClick={onClick} disabled={isLoading}>
      {isLoading ? 'Enrolling...' : 'Enroll Now'}
    </Button>
  )
}
