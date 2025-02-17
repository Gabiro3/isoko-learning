import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

type Params = { chapterId: string; courseId: string }

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const { userId } = await auth()
    // eslint-disable-next-line
    const { isPublished, ...values } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const ownCourse = await db.course.findUnique({ where: { id: params.courseId, createdById: userId } })
    if (!ownCourse) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const chapter = await db.chapter.update({ where: { id: params.chapterId }, data: { ...values } })

    return NextResponse.json(chapter)
  } catch {
    return new NextResponse('Internal server error', { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const ownCourse = await db.course.findUnique({ where: { id: params.courseId, createdById: userId } })
    if (!ownCourse) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const chapter = await db.chapter.findUnique({
      where: { id: params.chapterId, courseId: params.courseId },
    })
    if (!chapter) {
      return new NextResponse('Chapter not found', { status: 404 })
    }

    const deletedChapter = await db.chapter.delete({ where: { id: params.chapterId } })

    const publishedChaptersInCourse = await db.chapter.count({
      where: { courseId: params.courseId, isPublished: true },
    })

    if (!publishedChaptersInCourse) {
      await db.course.update({ where: { id: params.courseId }, data: { isPublished: false } })
    }

    return NextResponse.json(deletedChapter)
  } catch {
    return new NextResponse('Internal server error', { status: 500 })
  }
}
