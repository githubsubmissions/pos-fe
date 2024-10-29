export interface MenuItemTimeAvailability {
  id?: number;
  itemId?: number;
  timesAvailable: string[];
  quantity: number,
  createdAt: string // info : toISOString()
}