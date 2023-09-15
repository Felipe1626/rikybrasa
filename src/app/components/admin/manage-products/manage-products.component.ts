import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faAdd, faAngleDown, faPencil, faRepeat, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  faAdd = faAdd
  faAngleDown = faAngleDown

  selectedValue: string = '';
  inputValue: string = ''
  editingIndices: number[] = []
  
  constructor(private productsService: ProductsService){ }

  handleAClick(value: string, index: number) {
    if (this.editingIndices.includes(index)) {
      this.selectedValue = value;
      this.selectedValue
    }
    this.openOption(index);
  }
  
  openOption(index :number){
    if (this.editingIndices.includes(index)) {
      const options = document.getElementById('options')    
      const select = document.getElementById('select')
      if (select && options) {
        select.classList.toggle('border-blue-500')
        options.classList.toggle('hidden')
      }   
    }
  }

  toggleEdit(index: number) {
    if (this.editingIndices.includes(index)) {
      this.editingIndices = this.editingIndices.filter((i) => i !== index);
    } else {
      this.editingIndices.push(index);
    }
  }
  isEditing(index: number): boolean {
    return this.editingIndices.includes(index);
  }

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

  async updateProduct(index: number, form: NgForm){
    console.log(form)
    this.isEditing(index)
    await this.ngOnInit()
  }
}
