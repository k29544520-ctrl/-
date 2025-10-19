import React from 'react';
import { FoodCategory, FoodItem } from '../types';

interface MealTrayProps {
  selectedFoods: {
    rice?: FoodItem;
    soup?: FoodItem;
    sides: FoodItem[];
  };
}

interface TraySlotProps {
  category: FoodCategory | '반찬';
  item?: FoodItem;
  className?: string;
  isLarge?: boolean;
}

const TraySlot: React.FC<TraySlotProps> = ({ category, item, className = '', isLarge = false }) => {
  const categoryTextSize = isLarge ? 'text-lg' : 'text-base';
  const itemTextSize = isLarge ? 'text-xl' : 'text-lg';

  return (
    <div className={`bg-gray-100 rounded-lg border-2 border-dashed border-gray-400 flex flex-col items-center justify-center p-2 text-center transition-all duration-300 ${item ? 'border-solid border-emerald-500 bg-emerald-50' : ''} ${className}`}>
      {item ? (
        <span className={`text-emerald-800 font-bold ${itemTextSize}`}>{item.name}</span>
      ) : (
        <span className={`text-gray-500 font-semibold ${categoryTextSize}`}>{category}</span>
      )}
    </div>
  );
};


export const MealTray: React.FC<MealTrayProps> = ({ selectedFoods }) => {
  return (
    <div className="w-full max-w-lg bg-gray-300 rounded-2xl p-4 shadow-lg flex flex-col gap-3">
        {/* Top row for rice and soup */}
        <div className="grid grid-cols-5 gap-3">
            <TraySlot 
                category={FoodCategory.RICE} 
                item={selectedFoods.rice} 
                className="col-span-3 h-48"
                isLarge={true}
            />
            <TraySlot 
                category={FoodCategory.SOUP} 
                item={selectedFoods.soup} 
                className="col-span-2 h-48"
            />
        </div>
        {/* Bottom 2x2 grid for 4 side dishes */}
        <div className="grid grid-cols-2 gap-3">
            <TraySlot category="반찬" item={selectedFoods.sides[0]} className="h-40" />
            <TraySlot category="반찬" item={selectedFoods.sides[1]} className="h-40" />
            <TraySlot category="반찬" item={selectedFoods.sides[2]} className="h-40" />
            <TraySlot category="반찬" item={selectedFoods.sides[3]} className="h-40" />
        </div>
    </div>
  );
};