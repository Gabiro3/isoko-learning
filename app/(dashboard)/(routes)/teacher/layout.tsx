import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { isTeacher } from '@/lib/teacher'
import { isAdminUser } from "@/lib/check-admin"

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth()
  if (!isAdminUser(userId || 'user_0')) {
    return redirect('/')
  }

  return <>{children}</>
}
