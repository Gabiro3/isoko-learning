'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

type CourseEnrollButtonProps = {
  userId: string
  courseId: string
}

export default function CourseEnrollButton({ userId, courseId }: CourseEnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

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
        return redirect('/')
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.log(error)
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
