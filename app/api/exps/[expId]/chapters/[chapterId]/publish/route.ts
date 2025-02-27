import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

type Params = { chapterId: string; courseId: string }

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const ownCourse = await db.explaination.findUnique({ where: { id: params.courseId, createdById: userId } })
    if (!ownCourse) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const chapter = await db.chapter.findUnique({ where: { id: params.chapterId, explainationId: params.courseId } })
    if (![chapter, chapter?.title, chapter?.description, chapter?.gVideoUrl].every(Boolean)) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const publishedChapter = await db.chapter.update({
      where: { id: params.chapterId },
      data: { isPublished: true },
    })

    return NextResponse.json(publishedChapter)
  } catch {
    return new NextResponse('Internal server error', { status: 500 })
  }
}
