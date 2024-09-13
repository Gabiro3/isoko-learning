import { Category, Course } from '@prisma/client'
import { db } from '@/lib/db'

export type CourseWithCategoryAndChapters = Course & {
  category: Category | null
  chapters: { id: string }[]
}

export async function getAdminCourses(): Promise<CourseWithCategoryAndChapters[]> {
  try {
    // Fetch all courses regardless of userId, published status, or category filters
    const courses = await db.course.findMany({
      include: {
        category: true,  // Include course category information
        chapters: { select: { id: true } },  // Include chapter ids without filtering by publication
      },
      orderBy: {
        createdAt: 'desc',  // Order by course creation date
      },
    })

    // Since this is for admin, no need to calculate progress, simply return the courses
    return courses
  } catch (error) {
    console.error('Error fetching admin courses:', error)
    return []
  }
}
