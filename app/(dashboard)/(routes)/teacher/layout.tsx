import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { isAdminUser } from '@/lib/check-admin'

export default async function ExpLayout({ children }: { children: React.ReactNode }) {
  // Get the user ID and session data
  const { userId } = auth()

  // Check if the user is an admin using your `isAdminUser` function
  console.log(userId)
  if (!isAdminUser(userId)) {
    return redirect('/')
  }

  return <>{children}</>
}
