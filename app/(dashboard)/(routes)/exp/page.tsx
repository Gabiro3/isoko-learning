import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { Categories } from './_component/category'
import { SearchInput } from '@/components/search-input'
import { getExps } from '@/actions/get-epx'
import ExpList from '@/components/exp-list'

interface SearchExpProps {
  searchParams: {
    title: string
    categoryId: string
  }
}

const ExpPage = async ({ searchParams }: SearchExpProps) => {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/')
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const courses = await getExps({
    userId,
    ...searchParams,
  })

  return (
    <>
      <div className="block px-6 pt-6 md:mb-0 md:hidden">
        <SearchInput />
      </div>
      <div className="space-y-4 p-6">
        <Categories items={categories} />
        <ExpList items={courses} />
      </div>
    </>
  )
}

export default ExpPage
