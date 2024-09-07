'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { enrollUser } from '@/actions/enroll-user' // Import your enrollUser function

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

      // Call the enrollUser function
      const { success, message } = await enrollUser(userId, courseId)

      if (success) {
        toast.success(message) // Notify success
      } else {
        toast.error(message) // Notify the user if already enrolled
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

