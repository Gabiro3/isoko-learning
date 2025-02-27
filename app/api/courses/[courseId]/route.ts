import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isTeacher } from '@/lib/teacher'

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = await auth()
    const { courseId } = params
    const values = await req.json()

    if (!userId || !isTeacher(userId)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        createdById: userId,
      },
      data: {
        title: values?.title,
        description: values?.description,
        imageUrl: values?.imageUrl,
        categoryId: values?.categoryId,
        price: values?.price,
        attachments: values?.attachments,
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = await auth()

    if (!userId || !isTeacher(userId)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await db.course.findUnique({
      where: { id: params.courseId, createdById: userId },
      include: {
        chapters: true,
      },
    })

    if (!course) {
      return new NextResponse('Not found', { status: 404 })
    }

    const deletedCourse = await db.course.delete({ where: { id: params.courseId } })
    return NextResponse.json(deletedCourse)
  } catch {
    return new NextResponse('Internal server exception', { status: 500 })
  }
}
