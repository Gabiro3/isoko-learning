import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { DataTable } from './_component/data-table'
import { columns } from './_component/columns'
import { isAdminUser } from '@/lib/check-admin'

export default async function Exps() {
  const { userId } = auth()

  if (!userId || isAdminUser(userId)) {
    return redirect('/')
  }

  // Fetch the admin ID from environment variables
  const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID

  let exps

  // Check if the logged-in user is an admin
  if (userId === ADMIN_ID) {
    // If admin, return all unpublished courses
    exps = await db.explaination.findMany({
      where: { isPublished: false },
      orderBy: { createdAt: 'desc' },
    })
  } else {
    // If not admin, return courses created by the logged-in teacher
    exps = await db.explaination.findMany({
      where: { createdById: userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  return (
    <div className="space-y-6 p-6">
      <DataTable columns={columns} data={exps} />
    </div>
  )
}
