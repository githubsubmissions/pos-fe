export type EditItemRequest = {
  id: number;
  imagePath: string
  itemCategoryId: number;
  minStockLevel: number;
  name: string;
  price: number;
  status: string;
};