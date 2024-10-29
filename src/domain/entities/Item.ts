import {ItemCategory} from "./ItemCategory";

export interface Item {
  id: number;
  name: string;
  price: number;
  minStockLevel: number;
  imagePath: string;
  status: string;
  quantity: number
  itemCategoryDo: ItemCategory
  createdAt: string
  updatedAt: string
  trackStock: boolean
  stock: number
}

