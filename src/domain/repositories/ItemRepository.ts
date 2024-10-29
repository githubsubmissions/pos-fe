import {Item} from "../entities/Item";
import {Status} from "../enums/Status";
import {AddItemRequest} from '../requests/AddItemRequest';

interface ItemRepository {
  getItems(status: Status): Promise<[Item]>

  addItem(item: Item | AddItemRequest): Promise<Item>

  updateItem(item: Item | any): Promise<Item>

  getAllItems(): Promise<[Item]>
}

export default ItemRepository;
