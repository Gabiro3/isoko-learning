import { auth } from '@clerk/nextjs/server'
import React, { Suspense } from 'react'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { Categories } from './_component/category'
import { SearchInput } from '@/components/search-input'
import { getCourses } from '@/actions/get-courses'
import CoursesList from '@/components/course-list'

interface SearchPageProps {
  searchParams: {
    title: string
    categoryId: string
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/')
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const courses = await getCourses({
    userId,
    ...searchParams,
  })

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="block px-6 pt-6 md:mb-0 md:hidden">
        <SearchInput />
      </div>
      <div className="space-y-4 p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </Suspense>
  )
}

export default SearchPage
