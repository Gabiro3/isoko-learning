import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { CheckCircle, Clock, Check } from 'lucide-react'
import CoursesList from '@/components/course-list'
import { getDashboardCourses } from '@/actions/get-dashboard-courses'
import { getAdminAnalytics } from '@/actions/get-admin-courses'
import { InfoCard } from './_components/info-card'
import { db } from '@/lib/db'

export default async function Dashboard() {
  const { userId } = auth()
  const insertDefaultCategories = async () => {
    const categories = ['Robotics Engineering', 'IoT', 'Raspberry Pi', 'Arduino', 'Python', 'C++', 'Notion', 'Calendar', 'Slack', 'Tools']
    for (const category of categories) {
      await db.category.upsert({
        where: { name: category },
        update: {}, // No update needed, just ensure it exists
        create: { name: category },
      })
    }
  }

  if (!userId) {
    return redirect('/')
  }
  await insertDefaultCategories()

  // Get the ADMIN_ID from environment variables
  const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID
  const { completedCourses, coursesInProgress } = await getDashboardCourses(userId)

  // Check if the current user is the admin
  if (userId === ADMIN_ID) {
    // Fetch admin analytics data (all published and unpublished courses)
    const { publishedCourses, unpublishedCourses } = await getAdminAnalytics()

    // Render admin dashboard with "Courses Published" and "Courses Pending"
    return (
      <div className="space-y-4 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoCard icon={Check} label="Courses Published" numberOfItems={publishedCourses.length} variant="success" />
          <InfoCard icon={Clock} label="Courses Pending" numberOfItems={unpublishedCourses.length} />
        </div>
        <CoursesList items={[...completedCourses, ...coursesInProgress]} />
      </div>
    )
  }
  return (
    <div className="space-y-4 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInProgress.length} />
        <InfoCard icon={CheckCircle} label="Completed" numberOfItems={completedCourses.length} variant="success" />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  )
}
