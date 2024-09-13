import { Prisma } from '@prisma/client'
import { db } from '@/lib/db'

type CourseWithCategoryAndChapters = Prisma.CourseGetPayload<{ include: { category: true; chapters: true } }>

type AdminAnalyticsCourses = {
  publishedCourses: CourseWithCategoryAndChapters[]
  unpublishedCourses: CourseWithCategoryAndChapters[]
}

export async function getAdminAnalytics(): Promise<AdminAnalyticsCourses> {
  try {
    // Fetch all courses, both published and unpublished
    const allCourses = await db.course.findMany({
      include: {
        category: true,
        chapters: true, // Assuming chapters don't need to be filtered here
      },
    })

    // Separate courses into published and unpublished
    const publishedCourses = allCourses.filter(course => course.isPublished)
    const unpublishedCourses = allCourses.filter(course => !course.isPublished)

    return {
      publishedCourses,
      unpublishedCourses,
    }
  } catch (error) {
    console.error('Error fetching admin analytics:', error)
    return {
      publishedCourses: [],
      unpublishedCourses: [],
    }
  }
}
