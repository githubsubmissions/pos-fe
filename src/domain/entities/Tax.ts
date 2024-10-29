import {Status} from "../enums/Status";

export type Tax = {
  // id: number;
  // name: string;
  // price: number;
  // minStockLevel: number;
  // imagePath: string;
  // status: string;
  // quantity: number
  // itemCategoryDo: {
  //     id: number;
  //     name: string;
  //     status: string;


  // constructor(data: Partial<Item>) {
  //     this.id = data.id;
  //     this.name = data.name;
  //     this.price = data.price;
  //     this.minStockLevel = data.minStockLevel;
  //     this.imagePath = data.imagePath;
  //     this.status = data.status;
  //     this.quantity = data.quantity
  //     this.itemCategoryDo = {
  //         // id= number;
  //         // name= string;
  //         // status= string;
  //     };
  // }

  // incomplete
  // toJson() {
  //     return {
  //         id: this.id,
  //         firstname: this.firstname,
  //         email: this.email,
  //     };
  // }
}

export interface TaxNew {
  "createdAt": string,
  "id": number,
  "name": string,
  "percent": number,
  "status": Status,
  "updatedAt": string,
}

