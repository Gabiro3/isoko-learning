'use client'

import { UserButton, useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { SearchInput } from './search-input'
import { isTeacher } from '@/lib/teacher'
import { isAdminUser } from '@/lib/check-admin'

export const NavbarRoutes = () => {
  const { userId } = useAuth()
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith('/teacher')
  const isCoursePage = pathname?.includes('/courses')
  const isSearchPage = pathname?.includes('/search')

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
        ) : isTeacher(userId) || isAdminUser(userId || '') ? (
            <Link href={isAdminUser(userId || 'user_0') ? '/teacher/exps/' : '/teacher/courses'}>
              <Button size="sm" variant="ghost">
                {isAdminUser(userId || 'user_0') ? 'Admin mode' : 'Teacher mode'}
              </Button>
            </Link>

        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  )
}
