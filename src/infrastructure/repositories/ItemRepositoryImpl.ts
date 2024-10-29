import {Item} from "../../domain/entities/Item";
import {Status} from "../../domain/enums/Status";
import {AddItemRequest} from '../../domain/requests/AddItemRequest';
import apiClient from "../utils/ApiClient";
import ItemRepository from "../../domain/repositories/ItemRepository";

const itemRootSegment = 'item';

class ItemRepositoryImpl implements ItemRepository {
  async getItems(status: Status): Promise<[Item]> {
    const itemData = await apiClient.get(`/${itemRootSegment}/fetchAll`, {params: {status}});
    return itemData.data;
  }

  async addItem(item: Item | AddItemRequest): Promise<Item> {
    const itemData = await apiClient.get(`/${itemRootSegment}/add`, {params: item});
    return itemData.data;
  }

  async updateItem(item: Item | any): Promise<Item> {
    const itemData = await apiClient.get(`/${itemRootSegment}/edit`, {params: item});
    return itemData.data;
  }

  async getAllItems(): Promise<[Item]> {
    const itemData = await apiClient.get(`/${itemRootSegment}/fetchAll`)
    return itemData.data;
  }
}

export default ItemRepositoryImpl;
