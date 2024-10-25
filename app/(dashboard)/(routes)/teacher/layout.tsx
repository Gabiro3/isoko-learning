import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { isAdminUser } from '@/lib/check-admin'

export default function ExpLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth()
  if (!isAdminUser(userId)) {
    return redirect('/')
  }

  return <>{children}</>
}
