import {Item} from "../../domain/entities/Item";
import apiClient from "../utils/ApiClient";
import MenuRepository from "../../domain/repositories/MenuRepository";
import {MenuProduct} from "../../domain/entities/MenuProduct";
import {MenuItemTimeAvailability} from "../../domain/props/MenuItemTimeAvailability";

const itemRootSegment = 'menu';

class MenuRepositoryImpl implements MenuRepository {
  async getTodayItems(): Promise<MenuProduct[]> {
    const items = await apiClient.get(`/${itemRootSegment}/today/fetchAll`);
    return items.data;
  }

  async addTodaysMenu(menu: Array<MenuItemTimeAvailability>): Promise<boolean> {
    const response = await apiClient.post(`/${itemRootSegment}/today/add`, menu);
    return response.data;
  }

  async updateItem(menuItem: MenuItemTimeAvailability): Promise<boolean> {
    const itemData = await apiClient.post(`/${itemRootSegment}/today/update`, menuItem);
    return itemData.data;
  }

  async getAllItems(): Promise<[Item]> {
    const itemData = await apiClient.get(`/${itemRootSegment}/fetchAll`)
    return itemData.data;
  }

}

export default MenuRepositoryImpl;
