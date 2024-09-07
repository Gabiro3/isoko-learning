// /app/api/enroll/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { enrollUser } from '@/actions/enroll-user'

export async function POST(req: NextRequest) {
  try {
    const { userId, courseId } = await req.json()

    if (!userId || !courseId) {
      return new NextResponse(JSON.stringify({ message: 'User ID and Course ID are required' }), { status: 400 })
    }

    const result = await enrollUser(userId, courseId)
    return new NextResponse(JSON.stringify(result), { status: 200 })
  } catch (error) {
    console.error('Error enrolling user:', error)
    return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 })
  }
}

