'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'

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

      // Insert into purchase table
      await db.purchase.create({ data: { courseId, userId } })

      toast.success('You have successfully enrolled in the course!')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button className="w-full md:w-auto" size="sm" onClick={onClick} disabled={isLoading}>
      Enroll Now
    </Button>
  )
}
