import {ItemCategory} from "../entities/ItemCategory";
import {AddItemCategoryRequest} from '../requests/AddItemCategoryRequest';

interface ItemCategoryRepository {
  getItemCategories(): Promise<[ItemCategory]>

  addItemCategory(addItemCategoryRequest: AddItemCategoryRequest): Promise<ItemCategory>

  updateCategory(addItemCategoryRequest: AddItemCategoryRequest): Promise<ItemCategory>
}

export default ItemCategoryRepository;
