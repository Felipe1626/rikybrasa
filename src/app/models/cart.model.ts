import { CurrencyPipe } from "@angular/common";

export class CartItem {
  img: File | undefined;
  name: string | undefined;
  price: number | CurrencyPipe | undefined;
  quantity: number | undefined;
  comment: string | undefined;
  avalaible: boolean | undefined;
}

export class TotalQuantity{
  totalQuantity: number = 1;
}