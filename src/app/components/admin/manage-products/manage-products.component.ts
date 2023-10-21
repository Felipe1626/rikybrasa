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

  load: boolean = false
  selectedValue: string = '';
  inputValue: string = ''
  editingIndices: number[] = []
  categories: string[] = []
  selectedFiles: File[] = [];

  
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
    this.load = true
    this.productsService.getAllProducts().then(products => {
      this.products = products
      this.load = false
    }).catch(error => {
      console.error('Error fetching products:', error);
    });
    this.productsService.getAllCategories().then(() => {
      this.categories = this.productsService.categories
    });

  }

  async deleteProduct(name:string){  
    await this.productsService.deleteProduct(name)
    this.ngOnInit()
  }

  async updateProduct(index: number, form: NgForm){
    const imageNames: string[] = [];
    this.selectedFiles.push(form.value.imageSm, form.value.imageMd, form.value.imageLg)
    for (const file of this.selectedFiles) {
      if (file) {
        await this.productsService.addImage(file.name, file)
        const imageName = file.name
        if (imageNames) {
          imageNames.push(imageName)
        } else {
          console.error(`Error uploading an image:`, file)
        }
      }
    }
    console.log(form)
    this.isEditing(index)
    await this.productsService.updateProduct(form.value.name, new Product(form.value.name, form.value.description, form.value.price, form.value.avalaible, form.value.category, imageNames[0], imageNames[1], imageNames[2]))
    this.ngOnInit()
  }

  async updateProductAvalaibility(name: string, newValue: boolean){    
    let isAvalaible: boolean = false;
    if (isAvalaible !== newValue) {
      isAvalaible = true
    }else{
      isAvalaible = false
    }
  }
}
