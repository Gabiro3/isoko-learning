import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import DataCard from './_components/data-card'
import Chart from './_components/chart'
import { getAnalytics } from '@/actions/get-analytics'

export default async function Analytics() {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const { data } = await getAnalytics(userId)

  return (
    <div className="p-6">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <DataCard label="Total Revenue" value={250000} shouldFormat />
        <DataCard label="Total Sales" value={500} />
      </div>

      <Chart data={data} />
    </div>
  )
}
