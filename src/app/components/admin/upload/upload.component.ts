import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
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
  
  selectedFiles: File[] = [];

  constructor(private productService: ProductsService){}

  onFileSelected(event: any) {
    this.selectedFiles.push(event.target.files[0]);
  }

  ngOnInit() {
    this.productService.getAllProducts().then(products => {
      this.products = products;            
    }).catch(error => {
      console.error('Error fetching products:', error);
    });
  }

  async onFormSubmit(form: NgForm){
    const imageNames: string[] = [];

  for (const file of this.selectedFiles) {
    if (file) {
      await this.productService.addImage(file.name, file)
      const imageName = file.name

      if (imageNames) {
        imageNames.push(imageName)
      } else {
        console.error(`Error uploading an image:`, file)
      }
    }
  }
    
    await this.ngOnInit()    
    await setTimeout(() => {
      form.resetForm()
    }, 500);
    await console.log('FORM SUBMITED');

    
    return this.productService.addProduct(new Product(form.value.name, form.value.description, form.value.price, form.value.avalaible, form.value.category, imageNames[0], imageNames[1], imageNames[2]))
  }






}


