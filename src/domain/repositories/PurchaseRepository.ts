interface PurchaseRepository {
  // getItems(status: Status): Promise<[Item]>
  //
  // addItem(item: Item | AddItemRequest): Promise<Item>

  purchaseItems(purchase: /*Purchase |*/ any): Promise<any>

  // getAllItems(): Promise<[Item]>
}

export default PurchaseRepository;
