'use client'

import { Category } from '@prisma/client'
import {
  FcEngineering,
  FcElectroDevices,
  FcApproval,
  FcBullish,
  FcMindMap,
  FcPlus
} from 'react-icons/fc'
import { IconType } from 'react-icons'
import { CategoryItem } from './category-item'

interface CategoriesProps {
  items: Category[]
}

// Updated icon map with relevant icons for robotics and workplace tools
const iconMap: Record<Category['name'], IconType> = {
  'Kwirinda ibiza': FcElectroDevices,
  'Gusaba inguzanyo': FcBullish,
  'Ubuhinzi bwa kijyambere': FcEngineering,
  'Kugenzura ubuziranenge bw’ibiribwa': FcApproval,
  'Korora bya kijyambere': FcMindMap,
  'Ubuhinzi n’ibiribwa': FcPlus
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
