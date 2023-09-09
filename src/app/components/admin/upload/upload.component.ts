import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/products/products.model';
import { ProductsService } from 'src/app/services/products.service';
import { faAdd, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ManageProductsComponent } from '../manage-products/manage-products.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedValue: string = '';
  inputValue: string = ''

  handleAnchorClick(value: string) {
    this.selectedValue = value;
    this.selectedValue
    this.openOptions();
  }
  
  openOptions(){
    const options = document.getElementById('options')    
    const select = document.getElementById('select')
    if (select && options) {
      select.classList.toggle('border-blue-500')
      options.classList.toggle('hidden')
    }   
  }

  faAdd = faAdd
  faAngleDown = faAngleDown

  products?: Product[]


  constructor(private productService: ProductsService){}


  ngOnInit() {
    this.productService.getAllProducts().then(products => {
      this.products = products;            
    }).catch(error => {
      console.error('Error fetching products:', error);
    });
  }

  onFormSubmit(form: NgForm){
    console.log('FORM SUBMITED');
    console.log(form);
    setTimeout(() => {
      this.ngOnInit()
    }, 100);
    setTimeout(() => {
      form.resetForm()
    }, 500);
    return this.productService.addProduct(new Product(form.value.name, form.value.description, form.value.price, form.value.avalaible, form.value.category))
  }
}



