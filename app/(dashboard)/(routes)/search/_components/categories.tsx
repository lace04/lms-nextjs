'use client';

import { Category } from '@prisma/client';
import {
  FcBusinessman,
  FcBiomass,
  FcFilingCabinet,
  FcBriefcase,
  FcEngineering,
  FcBiotech,
  FcCommandLine,
  FcMultipleDevices,
} from 'react-icons/fc';
import { IconType } from 'react-icons';
import { CategoryItem } from './category-item';

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  //El nombre de la categoria debe ser igual al nombre del icono y al nombre de la fila en la base de datos
  "Administración": FcBusinessman,
  "Ciencias": FcBiomass,
  "Contaduría": FcFilingCabinet,
  "Derecho": FcBriefcase,
  "Ingeniería": FcEngineering,
  "Medicina": FcBiotech,
  "Sistemas": FcCommandLine,
  "Tecnología": FcMultipleDevices,
}

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
      {
        items.map((item) => (
          <CategoryItem
            key={item.id}
            label={item.name}
            icon={iconMap[item.name]}
            value={item.id}
          />
        ))
      }
    </div>
  );
};

export default Categories;
