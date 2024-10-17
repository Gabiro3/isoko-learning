import { Prisma } from '@prisma/client'
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import ExpSidebar from './exp-sidebar'

type ExpMobileSidebarProps = {
  explaination: Prisma.ExplainationGetPayload<{ include: { chapters: { include: { userProgress: true } } } }>
  progressCount: number
}

export default function ExpMobileSidebar({ explaination, progressCount }: ExpMobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
        <MenuIcon />
      </SheetTrigger>

      <SheetContent side="left" className="w-72 bg-white p-0">
        <ExpSidebar explaination={explaination} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  )
}
