'use client'

import axios from 'axios'
import { useState, useRef, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useConfettiStore } from '@/hooks/use-confetti'

interface VideoPlayerProps {
  videoUrl: string // Pass the Google Drive embed URL here
  courseId: string
  chapterId: string
  nextChapterId?: string
  isLocked: boolean
  completeOnEnd: boolean
}

export const VideoPlayer = ({
  videoUrl,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false)
  const router = useRouter()
  const confetti = useConfettiStore()
  const videoRef = useRef<HTMLIFrameElement>(null)

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        })

        if (!nextChapterId) {
          confetti.onOpen()
        }

        toast.success('Progress updated')
        router.refresh()

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
        }
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  // Polling mechanism to check if the video has ended (works as a fallback)
  useEffect(() => {
    const interval = setInterval(() => {
      const iframe = videoRef.current
      if (iframe) {
        // Placeholder logic to detect video ending
        // Implement actual video end detection for your specific use case
        const isEnded = false // Replace this with actual detection logic
        if (isEnded) {
          clearInterval(interval)
          onEnd()
        }
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-slate-800 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <iframe
          ref={videoRef}
          src={videoUrl}
          width="640"
          height="480"
          allow="autoplay"
          onLoad={() => setIsReady(true)} // Set ready when iframe loads
          className={cn(!isReady && 'hidden')}
        />
      )}
    </div>
  )
}
