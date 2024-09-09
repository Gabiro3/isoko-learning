import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Include 'chapters' in the query result
    const course = await db.course.findUnique({
      where: { id: params.courseId, createdById: userId },
      include: { chapters: true }, // Include chapters relation
    })

    if (!course) {
      return new NextResponse('Not Found', { status: 404 })
    }

    /** Check if the course has a published chapter */
    const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished)

    if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const publishedCourse = await db.course.update({
      where: { id: params.courseId },
      data: { isPublished: true }
    })

    return NextResponse.json(publishedCourse)
  } catch (error) {
     console.error(error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
