import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { isAdminUser } from '@/lib/check-admin'

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth()
  if (!userId || !isAdminUser(userId)) {
    return redirect('/')
  }

  return <>{children}</>
}
