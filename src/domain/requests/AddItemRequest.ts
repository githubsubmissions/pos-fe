export type AddItemRequest = {
  imagePath: string
  itemCategoryId: number;
  minStockLevel: number;
  name: string;
  price: number;
  status: string;
};