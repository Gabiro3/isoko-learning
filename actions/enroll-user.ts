import { db } from '@/lib/db'

export async function enrollUser(userId: string, courseId: string): Promise<{ success: boolean; message: string }> {
  try {
    // Check if the user is already enrolled in the course
    const existingPurchase = await db.purchase.findFirst({
      where: {
        userId,
        courseId,
      },
    })

    if (existingPurchase) {
      return { success: false, message: 'You are already enrolled in this course.' }
    }

    // Enroll the user by creating a new purchase entry
    await db.purchase.create({
      data: {
        userId,
        courseId,
      },
    })

    return { success: true, message: 'Successfully enrolled in the course!' }
  } catch (error) {
    console.error('Error enrolling user:', error)
    return { success: false, message: 'Something went wrong during enrollment.' }
  }
}