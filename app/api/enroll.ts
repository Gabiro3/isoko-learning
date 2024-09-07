// /app/api/enroll.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { enrollUser } from '@/actions/enroll-user'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, courseId } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (!userId || !courseId) {
    return res.status(400).json({ message: 'User ID and Course ID are required' })
  }

  try {
    const result = await enrollUser(userId, courseId)
    return res.status(200).json(result)
  } catch (error) {
    console.error('Error enrolling user:', error)
    return res.status(500).json({ message: 'Something went wrong' })
  }
}
