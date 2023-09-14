import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products/products.model';
import { ProductsService } from 'src/app/services/products.service';
import { faHandPointer, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowUp, faClose, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  faHandPointer = faHandPointer
  faPenToSquare = faPenToSquare
  faClose = faClose
  faShoppingBasket = faShoppingBasket
  faArrowUp = faArrowUp

  quantity: number = 1

  purchaseIndices: number[] = []
  imageIndices: number[] = []


  togglePurchase(index: number) {
    if (this.purchaseIndices.includes(index)) {
      this.purchaseIndices = this.purchaseIndices.filter((i) => i !== index);
    } else {
      this.purchaseIndices.push(index);
    }
  }
  purchase(index: number): boolean {
    return this.purchaseIndices.includes(index);
  }

  OpenImg(index: number){
    if (this.imageIndices.includes(index)) {
      this.imageIndices = this.imageIndices.filter((i) => i !== index);
    } else {
      this.imageIndices.push(index);
    }
  }
  isOpen(index: number): boolean {
    return this.imageIndices.includes(index);
  }

  removeQuantity(index: number){
    if (this.quantity > 0) {
      this.quantity --
    }
    if (this.quantity == 0) {
      this.togglePurchase(index)
      this.quantity = 1;
    }
  }

  addQuantity(){
    if(this.quantity < 10){
      this.quantity ++
    }
    if (this.quantity === 10) {
      alert(`Para Compras Superiores a 10 Productos Debes Contactar al Restaurante Para Confirmar Disponibilidad
      Llamanos +57 3124023188`)
    }
  }

  products: Product[] = [];

  constructor(private productsService: ProductsService){ }

  ngOnInit() {
    this.productsService.getAllProducts().then(products => {
      this.products = products;
    }).catch(error => {
      console.error('Error fetching products:', error);
    });
    setInterval(() => { 
      if (this.ngOnInit) {
        this.ngOnInit()
      }
    }, 20000);
  }

}
     
     
    






