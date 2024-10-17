import { Category, Course } from '@prisma/client'
import { db } from '@/lib/db'
import { getProgress } from './get-progress'

export type ExpWithCategory = Course & {
  category: Category | null
  chapters: { id: string }[]
  progress: number | null
}

type GetExpArgs = {
  userId: string
  title?: string
  categoryId?: string
}

export async function getExps({
  userId,
  title,
  categoryId,
}: GetExpArgs): Promise<ExpWithCategory[]> {
  try {
    const explainations = await db.explaination.findMany({
      where: { isPublished: true, title: { contains: title }, categoryId },
      include: {
        category: true,
        chapters: { where: { isPublished: true }, select: { id: true } },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const coursesWithProgress: ExpWithCategory[] = await Promise.all(
      explainations.map(async (exp) => {

        const progressPercentage = await getProgress(userId, exp.id)
        return {
          ...exp,
          progress: progressPercentage,
        }
      }),
    )

    return coursesWithProgress
  } catch {
    return []
  }
}