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
  Mathematics: FcCalculator,
  Chemistry: FcBiohazard,
  Physics: FcEngineering,
  Biology: FcBiotech,
  Languages: FcReading,
  'Technology': FcMultipleDevices,
  History: FcBusinessman,
  Geography: FcGlobe,
  Economics: FcSalesPerformance,
  'Arts & Literature': FcOldTimeCamera,
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
