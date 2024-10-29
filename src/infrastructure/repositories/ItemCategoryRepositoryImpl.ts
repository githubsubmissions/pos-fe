import {ItemCategory} from "../../domain/entities/ItemCategory";
import {AddItemCategoryRequest} from '../../domain/requests/AddItemCategoryRequest';
import apiClient from "../utils/ApiClient";
import ItemCategoryRepository from "../../domain/repositories/ItemCategoryRepository";

const itemRootSegment = 'item/category';

class ItemCategoryRepositoryImpl implements ItemCategoryRepository {
  async getItemCategories(): Promise<[ItemCategory]> {
    const itemData = await apiClient.get(`/${itemRootSegment}/fetchAll`);
    return itemData.data;
  }

  async addItemCategory(addItemCategoryRequest: AddItemCategoryRequest): Promise<ItemCategory> {
    const itemData = await apiClient.get(`/${itemRootSegment}/add`, {params: addItemCategoryRequest});
    return itemData.data;
  }

  async updateCategory(addItemCategoryRequest: AddItemCategoryRequest): Promise<ItemCategory> {
    const itemData = await apiClient.get(`/${itemRootSegment}/edit`, {params: addItemCategoryRequest});
    return itemData.data;
  }

}

export default ItemCategoryRepositoryImpl;
