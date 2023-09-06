import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products/products.model';
import { ProductsService } from 'src/app/services/products.service';
import { faHandPointer, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faClose, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

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

  quantity = 0

  OpenImg(){}

  toggleQuantity(){}

  removeCuantity(){}

  addQuantity(){}

  products: Product[] = [];

  constructor(private productsService: ProductsService){ }

  ngOnInit() {
    setInterval(() => { 
      this.productsService.getAllProducts().then(products => {
        this.products = products;
      }).catch(error => {
        console.error('Error fetching products:', error);
      });
    }, 20000);
  }
}
     
     
    






