import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isTeacher } from '@/lib/teacher'

export async function POST(request: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = await auth()
    const { url } = await request.json()

    if (!userId || !isTeacher(userId)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        createdById: userId,
      },
    })

    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name: `Course File : ${url.split('.').pop()}`, // Prefix with "File" and append the first two characters
        courseId: params.courseId,
      },
    })

    return NextResponse.json(attachment)
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 })
  }
}
