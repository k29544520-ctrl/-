import { FoodCategory, FoodItem } from './types';

export const FOOD_DATABASE: FoodItem[] = [
  // 밥 (Rice)
  { id: 1, name: '흰밥', category: FoodCategory.RICE, imageUrl: 'https://i.imgur.com/O1QIY1f.jpeg' },
  // 국 (Soup)
  { id: 2, name: '미역국', category: FoodCategory.SOUP, imageUrl: 'https://i.imgur.com/Q2dE1sg.jpeg' },
  // 채소 (Vegetable)
  { id: 3, name: '시금치무침', category: FoodCategory.VEGETABLE, imageUrl: 'https://i.imgur.com/I7K2a7v.jpeg' },
  { id: 4, name: '깍두기', category: FoodCategory.VEGETABLE, imageUrl: 'https://i.imgur.com/o22Vv8o.jpeg' },
  { id: 5, name: '오이무침', category: FoodCategory.VEGETABLE, imageUrl: 'https://i.imgur.com/Y6xOwQl.jpeg' },
  { id: 12, name: '콩나물무침', category: FoodCategory.VEGETABLE, imageUrl: 'https://i.imgur.com/eGjnyva.jpeg' },
  { id: 13, name: '우엉조림', category: FoodCategory.VEGETABLE, imageUrl: 'https://i.imgur.com/8N3M042.jpeg' },
  // 고기 (Meat)
  { id: 6, name: '불고기', category: FoodCategory.MEAT, imageUrl: 'https://i.imgur.com/Q71kNBk.jpeg' },
  { id: 7, name: '닭갈비', category: FoodCategory.MEAT, imageUrl: 'https://i.imgur.com/pva2DSH.jpeg' },
  { id: 8, name: '생선구이', category: FoodCategory.MEAT, imageUrl: 'https://i.imgur.com/A6jAXXs.jpeg' },
  { id: 14, name: '제육볶음', category: FoodCategory.MEAT, imageUrl: 'https://i.imgur.com/p9s7o5B.png' },
  { id: 15, name: '양념치킨', category: FoodCategory.MEAT, imageUrl: 'https://i.imgur.com/gK2z9fu.jpeg' },
  // 과일 (Fruit)
  { id: 9, name: '사과', category: FoodCategory.FRUIT, imageUrl: 'https://i.imgur.com/DBw6a1M.jpeg' },
  { id: 10, name: '바나나', category: FoodCategory.FRUIT, imageUrl: 'https://i.imgur.com/2G45T7F.jpeg' },
  { id: 11, name: '오렌지', category: FoodCategory.FRUIT, imageUrl: 'https://i.imgur.com/TETbB4M.jpeg' },
  { id: 16, name: '포도', category: FoodCategory.FRUIT, imageUrl: 'https://i.imgur.com/RC1Ea2o.jpeg' },
  { id: 17, name: '딸기', category: FoodCategory.FRUIT, imageUrl: 'https://i.imgur.com/kFL2wcr.jpeg' },
];

export const CATEGORIES_ORDER: FoodCategory[] = [
    FoodCategory.RICE,
    FoodCategory.SOUP,
    FoodCategory.VEGETABLE,
    FoodCategory.MEAT,
    FoodCategory.FRUIT
];

export const SOUND_EFFECTS = {
  SELECT: 'https://cdn.jsdelivr.net/gh/k-next/sounds@main/ui/button-50.mp3',
  DESELECT: 'https://cdn.jsdelivr.net/gh/k-next/sounds@main/ui/button-53.mp3',
};