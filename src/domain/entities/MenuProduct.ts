import {Item} from "./Item";

export interface MenuProduct {
  id: number;
  date: string;
  timeOfDay: string[];
  quantity: number
  item: Item
  createdAt: string
  updatedAt: string
}


// private Long id;
//
// private LocalDate date;
//
// private ItemDo itemDo;
//
// private int quantity;
//
// private String timeOfDay;
//
// private LocalDateTime createdAt;
//
// private LocalDateTime updatedAt;

