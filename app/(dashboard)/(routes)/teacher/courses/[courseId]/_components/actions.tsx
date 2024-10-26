'use client'

import { TrashIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { redirect, useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/modals'
import { useConfettiStore } from '@/hooks/use-confetti'
import { isTeacher } from '@/lib/teacher'

type ActionsProps = {
  disabled?: boolean
  isPublished?: boolean
  courseId: string
}

export default function Actions({ disabled, isPublished, courseId }: ActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const confetti = useConfettiStore()
  const { userId } = useAuth()

  // Redirect if the user is not a teacher
  if (!isTeacher(userId)) {
    redirect('/')
  }

  // Check if the user is an admin
  useEffect(() => {
    const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
    setIsAdmin(userId === adminId)
  }, [userId])

  const onDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/courses/${courseId}`)
      toast.success('Course deleted')
      router.refresh()
      router.push(`/teacher/courses/${courseId}`)
    } catch {
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  const onPublish = async () => {
    try {
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`)
        toast.success('Course unpublished!')
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success('Course published!')
        confetti.onOpen()
      }
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      {/* Render Publish/Unpublish button only if the user is an admin */}
      {isAdmin && (
        <Button disabled={disabled || isLoading} variant="outline" size="sm" onClick={onPublish}>
          {isPublished ? 'Unpublish' : 'Publish'}
        </Button>
      )}
      <ConfirmModal onConfirm={onDelete}>
        <Button variant="destructive" size="sm" disabled={isLoading}>
          <TrashIcon className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}
