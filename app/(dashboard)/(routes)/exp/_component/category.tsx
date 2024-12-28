'use client'

import { Category } from '@prisma/client'
import {
  FcElectricalSensor,
  FcAutomatic,
  FcLinux,
  FcTimeline,
  FcTodoList,
  FcVideoCall,
  FcSettings
} from 'react-icons/fc'
import { IconType } from 'react-icons'
import { CategoryItem } from './category-item'
import { FaAnchor, FaCreativeCommonsPdAlt, FaMicrochip } from 'react-icons/fa'

interface CategoriesProps {
  items: Category[]
}

// Updated icon map with relevant icons for robotics and workplace tools
const iconMap: Record<Category['name'], IconType> = {
  IoT: FcElectricalSensor,
  'Raspberry Pi': FaMicrochip,
  Arduino: FcAutomatic,
  Python: FaCreativeCommonsPdAlt,
  'C++': FcLinux,
  Notion: FcTodoList,
  Calendar: FcTimeline,
  Slack: FcVideoCall,
  'Tools': FaAnchor,
  'Robotics Engineering': FcSettings
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
