import {Item} from "../entities/Item";
import {MenuProduct} from "../entities/MenuProduct";
import {MenuItemTimeAvailability} from "../props/MenuItemTimeAvailability";

interface MenuRepository {
  getTodayItems(): Promise<MenuProduct[]>

  addTodaysMenu(menu: Array<MenuItemTimeAvailability>): Promise<boolean>

  updateItem(menuItem: MenuItemTimeAvailability): Promise<boolean>

  getAllItems(): Promise<[Item]>
}

export default MenuRepository;
