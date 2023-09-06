import { Component } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/products/products.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent {
  products: Product[] = []
  faPancil = faPencil
  faTrash = faTrash


  constructor(private productsService: ProductsService){ }

  ngOnInit() {
    setInterval(() => { 
      this.productsService.getAllProducts().then(products => {
        this.products = products;
      }).catch(error => {
        console.error('Error fetching products:', error);
      });
    }, 2000);
  }
}
