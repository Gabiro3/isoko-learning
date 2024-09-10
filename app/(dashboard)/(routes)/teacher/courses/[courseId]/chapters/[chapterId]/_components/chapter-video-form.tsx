'use client'

import * as z from 'zod'
import axios from 'axios'
import { Pencil, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Chapter } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input' // Assuming you have an Input component in your UI

interface ChapterVideoFormProps {
  initialData: Chapter
  courseId: string
  chapterId: string
  gvideoUrl: string | null
}

const formSchema = z.object({
  gVideoUrl: z.string().url().min(1, 'Please provide a valid Google Drive URL'),
})

export const ChapterVideoForm = ({ initialData, courseId, chapterId }: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  // Use initialData.gVideoUrl for initialization
  const [gVideoUrl, setGVideoUrl] = useState(initialData.gVideoUrl || '')

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success('Chapter updated')
      toggleEdit()
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    }
  }

  const handleSubmit = () => {
    const parsed = formSchema.safeParse({ gVideoUrl })
    if (parsed.success) {
      onSubmit(parsed.data)
    } else {
      toast.error(parsed.error.issues[0].message)
    }
  }

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !gVideoUrl && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a video URL
            </>
          )}
          {!isEditing && gVideoUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit video URL
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div className="relative mt-2 aspect-video">
          {gVideoUrl ? (
            <iframe
              src={gVideoUrl}
              width="100%"
              height="100%"
              allow="autoplay"
              title="Google Drive Video"
            />
          ) : (
            <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
              <p>No video available</p>
            </div>
          )}
        </div>
      )}

      {isEditing && (
        <div className="mt-4">
          <Input
            type="text"
            name="gVideoUrl"
            placeholder="Paste Google Drive video URL here"
            value={gVideoUrl}
            onChange={(e) => setGVideoUrl(e.target.value)}
          />
          <Button onClick={handleSubmit} className="mt-2">
            Save URL
          </Button>
        </div>
      )}

      {gVideoUrl && !isEditing && (
        <div className="mt-2 text-xs text-muted-foreground">
          If the video does not appear, make sure the link is correct and shared publicly from Google Drive.
        </div>
      )}
    </div>
  )
}
