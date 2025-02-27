import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await db.course.findUnique({
      where: { id: params.courseId, createdById: userId }
    })

    if (!course) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const unpublishedCourse = await db.course.update({ where: { id: params.courseId }, data: { isPublished: false } })

    return NextResponse.json(unpublishedCourse)
  } catch {
    return new NextResponse('Internal server error', { status: 500 })
  }
}
