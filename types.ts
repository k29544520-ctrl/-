
export enum FoodCategory {
  RICE = '밥',
  SOUP = '국',
  VEGETABLE = '채소',
  MEAT = '고기',
  FRUIT = '과일',
}

export interface FoodItem {
  id: number;
  name: string;
  category: FoodCategory;
  imageUrl: string;
}
