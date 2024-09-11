'use client'

import { Category } from '@prisma/client'
import {
  FcEngineering,
  FcMultipleDevices,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcGlobe,
  FcBusinessman,
  FcCalculator,
  FcReading,
  FcBiohazard,
  FcBiotech,
  FcBiomass,
  FcConferenceCall
} from 'react-icons/fc'
import { IconType } from 'react-icons'
import { CategoryItem } from './category-item'

interface CategoriesProps {
  items: Category[]
}

// Updated icon map with relevant icons for the provided categories
const iconMap: Record<Category['name'], IconType> = {
  Mathematics: FcCalculator,          // Icon for Mathematics
  Chemistry: FcBiohazard,             // Icon for Chemistry
  Physics: FcEngineering,             // Using engineering for Physics (can change if desired)
  Biology: FcBiotech,                   // Icon for Biology (representing nature, can be changed)
  Languages: FcReading,               // Icon for Languages (represents reading)
  'Technology': FcMultipleDevices, // Icon for Computer Science
  History: FcBusinessman,             // Icon for History (can be changed if preferred)
  Geography: FcGlobe,                 // Icon for Geography
  Economics: FcSalesPerformance,      // Icon for Economics (business-related)
  'Arts & Literature': FcOldTimeCamera, // Icon for Arts and Literature (using camera)
  'Science': FcBiomass,
  'Religion': FcConferenceCall
}

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem key={item.id} label={item.name} icon={iconMap[item.name]} value={item.id} />
      ))}
    </div>
  )
}
