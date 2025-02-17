import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Banner } from '@/components/banner'
import { Preview } from '@/components/preview'
import { VideoPlayer } from './_components/video-player'
import { getChapter } from '@/actions/get-chapter'
import { Separator } from '@/components/ui/separator'
import { CourseProgressButton } from './_components/course-progress-button'
import CourseEnrollButton from './_components/course-enroll'

export default async function ChapterDetails({ params }: { params: { courseId: string; chapterId: string } }) {
  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  }
  const { chapter, course, attachments, nextChapter, userProgress, purchase } = await getChapter({
    userId,
    ...params,
  })

  if (!chapter || !course) {
    return redirect('/')
  }

  const isLocked = !chapter.isFree && !purchase
  const completedOnEnd = !!purchase && !userProgress?.isCompleted

  return (
    <div>
      {userProgress?.isCompleted ? <Banner label="You already completed this chapter" variant="success" /> : null}
      {isLocked ? <Banner label="You need to purchase this course to watch this chapter" /> : null}

      <div className="mx-auto flex max-w-4xl flex-col pb-20">
        <div className="p-4">
          <VideoPlayer
            videoUrl={chapter?.gVideoUrl || 'https://drive.google.com/file/d/1LDPRA42Z5L-N2c7B1Oes1PAS8JAsEBpq/preview'}
            chapterId={chapter.id}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            isLocked={isLocked}
            completeOnEnd={completedOnEnd}
          />
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="mb-2 text-2xl font-semibold">{chapter.title}</h2>
            <div className="flex space-x-2">
              {purchase ? (
                <CourseProgressButton
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  nextChapterId={nextChapter?.id}
                  isCompleted={!!userProgress?.isCompleted}
                />
              ) : (
                <CourseEnrollButton courseId={params.courseId} userId={userId} />
              )}
            </div>
          </div>

          <Separator />

          <div>
            <Preview value={chapter.description!} />
          </div>

          {attachments.length ? (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    className="flex w-full items-center rounded-md border bg-sky-200 p-3 text-sky-700 hover:underline"
                    key={attachment.id}
                    target="_blank"
                    href={attachment.url}
                    rel="noreferrer"
                  >
                    {attachment.name}
                  </a>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
