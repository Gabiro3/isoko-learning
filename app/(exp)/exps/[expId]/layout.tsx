import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import ExpNavbar from './_components/exp-navbar'
import ExpSidebar from './_components/exp-sidebar'
import { getProgress } from '@/actions/get-progress'

export default async function ExpLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { courseId: string }
}) {
  const { userId } = await auth()
  if (!userId) {
    return redirect('/')
  }

  const explaination = await db.explaination.findUnique({
    where: { id: params.courseId },
    include: {
      chapters: {
        where: { isPublished: true },
        include: { userProgress: { where: { userId } } },
        orderBy: { position: 'asc' },
      },
    },
  })

  if (!explaination) {
    return redirect('/')
  }

  const progressCount = await getProgress(userId, explaination.id)

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 h-20 w-full md:pl-80">
        <ExpNavbar explaination={explaination} progressCount={progressCount} />
      </div>

      <div className="fixed inset-y-0 z-50 hidden h-full w-80 flex-col md:flex">
        <ExpSidebar explaination={explaination} progressCount={progressCount} />
      </div>

      <main className="h-full pt-20 md:pl-80">{children}</main>
    </div>
  )
}
