import React from 'react';
import { FoodItem, FoodCategory } from '../types';
import { FOOD_DATABASE, CATEGORIES_ORDER } from '../constants';

interface FoodSelectionPanelProps {
  onSelectFood: (food: FoodItem) => void;
}

const getCategoryStyle = (category: FoodCategory) => {
    switch (category) {
        case FoodCategory.RICE: return 'text-stone-700 border-stone-500';
        case FoodCategory.SOUP: return 'text-sky-700 border-sky-500';
        case FoodCategory.VEGETABLE: return 'text-green-700 border-green-500';
        case FoodCategory.MEAT: return 'text-red-700 border-red-500';
        case FoodCategory.FRUIT: return 'text-orange-700 border-orange-500';
        default: return 'text-gray-700 border-gray-500';
    }
}

const FoodCard: React.FC<{ item: FoodItem, onSelect: () => void }> = ({ item, onSelect }) => {
    return (
        <button
            onClick={onSelect}
            className="group border-2 border-gray-200 bg-white rounded-lg shadow-sm flex justify-center items-center text-center cursor-pointer hover:shadow-lg hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 p-2 h-16"
        >
            <span className="font-semibold text-gray-700 text-sm">{item.name}</span>
        </button>
    );
};

export const FoodSelectionPanel: React.FC<FoodSelectionPanelProps> = ({ onSelectFood }) => {
    const groupedFoods = FOOD_DATABASE.reduce((acc, food) => {
        if (!acc[food.category]) {
            acc[food.category] = [];
        }
        acc[food.category].push(food);
        return acc;
    }, {} as { [key in FoodCategory]?: FoodItem[] });

    return (
        <div className="bg-emerald-50 p-4 rounded-xl border-2 border-emerald-200">
            <h2 className="text-2xl font-semibold mb-4 text-center">음식을 골라주세요</h2>
            <div className="space-y-6">
                {CATEGORIES_ORDER.map(category => (
                    <div key={category}>
                        <h3 className={`text-xl font-bold mb-3 pl-2 border-l-4 ${getCategoryStyle(category)}`}>{category}</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {groupedFoods[category]?.map(item => (
                                <FoodCard key={item.id} item={item} onSelect={() => onSelectFood(item)} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};