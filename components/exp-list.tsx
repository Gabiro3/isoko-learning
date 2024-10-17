import { ExpWithCategory } from '@/actions/get-epx'
import CourseCard from './course-card'

type ExpListProps = {
  items: ExpWithCategory[]
}

export default function ExpList({ items }: ExpListProps) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {items.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageUrl={course.imageUrl!}
            price={course.price!}
            progress={course.progress}
            chaptersLength={course.chapters.length}
            category={course?.category?.name ?? ''}
          />
        ))}
      </div>

      {items.length === 0 ? (
        <div className="mt-10 text-center text-sm text-muted-foreground">No explainations found!</div>
      ) : null}
    </div>
  )
}
