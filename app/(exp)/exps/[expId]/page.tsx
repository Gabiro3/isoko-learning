import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

const ExpIdPage = async ({ params }: { params: { courseId: string } }) => {
  const explaination = await db.explaination.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  if (!explaination) {
    return redirect('/')
  }

  return redirect(`/exps/${explaination.id}/chapters/${explaination.chapters[0].id}`)
}

export default ExpIdPage
