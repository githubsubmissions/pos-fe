import {ItemCategory} from "./ItemCategory";

export interface AnalyticsItem {
  id: number;
  name: string;
  price: number;
  quantitySold: number
  itemCategoryDo: ItemCategory
  date: string
}

