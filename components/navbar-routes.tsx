'use client'

import { UserButton, useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { SearchInput } from './search-input'
import { isTeacher } from '@/lib/teacher'

export const NavbarRoutes = () => {
  const { userId } = useAuth()
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith('/teacher')
  const isCoursePage = pathname?.includes('/courses')
  const isSearchPage = pathname?.includes('/search')

  // Fetch the admin ID from environment variables
  const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID

  // Check if the logged-in user is an admin
  const isAdmin = userId === ADMIN_ID

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="ml-auto flex gap-x-2">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) || isAdmin ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              {isAdmin ? 'Admin mode' : 'Teacher mode'}
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  )
}
