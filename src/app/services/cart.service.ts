import { Injectable } from '@angular/core';
import { CartItem, TotalQuantity } from '../models/cart.model';
import { Product } from '../models/products/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItem = new CartItem

  constructor() { }
  
  getProduct(product: Product){
    this.cartItem.name = product.name
    this.cartItem.price = product.price
    this.cartItem.avalaible = product.avalaible
  }

  addQuantity(){
    if (this.cartItem.quantity) {
      this.cartItem.quantity ++
    }
  }
  removeCuantity(){
    if (this.cartItem.quantity) {
      this.cartItem.quantity -- 
    }
  }
  deleteProduct(){
    if (this.cartItem) {
      this.cartItem.quantity = 0
    }
  }
}
