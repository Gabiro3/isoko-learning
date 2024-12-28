'use client'

import { Category } from '@prisma/client'
import {
  FcEngineering,
  FcElectronics,
  FcAutomotive,
  FcElectroDevices,
  FcCommandLine,
  FcDataSheet,
  FcCollaboration,
  FcCalendar,
  FcWorkflow,
  FcShipped
} from 'react-icons/fc'
import { IconType } from 'react-icons'
import { CategoryItem } from './category-item'

interface CategoriesProps {
  items: Category[]
}

// Updated icon map with relevant icons for robotics and workplace tools
const iconMap: Record<Category['name'], IconType> = {
  IoT: FcElectroDevices,
  'Raspberry Pi': FcElectronics,
  Arduino: FcAutomotive,
  Python: FcCommandLine,
  'C++': FcDataSheet,
  Notion: FcCollaboration,
  Calendar: FcCalendar,
  Slack: FcWorkflow,
  Tools: FcShipped,
  'Robotics Engineering': FcEngineering
}

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="categories-container">
      <div className="categories-list">
        {items.map((item) => (
          <CategoryItem key={item.id} label={item.name} icon={iconMap[item.name]} value={item.id} />
        ))}
      </div>
    </div>
  )
}

