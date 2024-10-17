import { Prisma } from '@prisma/client'
import ExpMobileSidebar from './exp-mobile-sidebar'
import { NavbarRoutes } from '@/components/navbar-routes'

type ExpNavbarProps = {
  explaination: Prisma.ExplainationGetPayload<{ include: { chapters: { include: { userProgress: true } } } }>
  progressCount: number
}

export default function ExpNavbar({ explaination, progressCount }: ExpNavbarProps) {
  return (
    <div className="flex h-full items-center border-b bg-white p-4 shadow-sm">
      <ExpMobileSidebar explaination={explaination} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  )
}
