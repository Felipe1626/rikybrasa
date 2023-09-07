import { Component } from '@angular/core';
import { faPencil, faRepeat, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  faRepeat = faRepeat

  constructor(private productsService: ProductsService){ }

  ngOnInit() {
      this.productsService.getAllProducts().then(products => {
        this.products = products;
        console.log('product load');
        
      }).catch(error => {
        console.error('Error fetching products:', error);
      });
    
  }




  deleteProduct(name:string){  
    this.productsService.deleteProduct(name)
    console.log('Product Deleted.')
    setTimeout(() => {
      this.ngOnInit()
    }, 100);
  }
}
