import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products/products.model';
import { ProductsService } from 'src/app/services/products.service';
import { faHandPointer, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faArrowUp, faCheck, faClose, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { CartItem, Cart } from 'src/app/models/cart.model';
import { __values } from 'tslib';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

type products = { [key: string]: Product[] };


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  cart: Cart = { items: []};
  products: products = {}
  faHandPointer = faHandPointer
  faPenToSquare = faPenToSquare
  faClose = faClose
  faShoppingBasket = faShoppingBasket
  faArrowUp = faArrowUp
  faCheck = faCheck
  faAngleDown = faAngleDown

  load: boolean = false
  comment: boolean = false
  selectedValue: string = 'Adicionales'
  commentValue: string = ''
  purchaseIndices: string[] = []
  purchaseIndex: number[] = []
  imageIndices: number[] = []
  categories: string[] = []
  servings: string[] = []
  
  handleStatusAnchorClick(value: string) {
    if (value == 'Adicionales') {
      this.selectedValue = 'Adicionales'
    }else{
      this.selectedValue = value
      this.selectedValue
    }

    this.OpenCategoryOptions()
  }

  OpenCategoryOptions(){
    const businessOptions = document.getElementById('businessOptions')
    if (businessOptions) {
      businessOptions.classList.toggle('hidden');
    }
  }

  togglePurchase(index: number) {
    if (this.purchaseIndex.includes(index)) {
      this.purchaseIndex = this.purchaseIndex.filter((i) => i !== index);
    } else {
      this.purchaseIndex.push(index);
    }
  }
  
  purchase(index: number, product: Product) {

      let _comment = 'N/A'
      const items = [...this.cart.items];
      const itemInCart = items.find((_item) => _item.name === product.name);
      if(product.comment){
        _comment = product.comment
      }

      const cartItem: CartItem = {
        img: product.imageSm,
        name: product.name,
        price: product.price,
        avalaible: product.avalaible,
        quantity: product.quantity!,
        comment: _comment
      };

    if (!this.purchaseIndex.includes(index)) {

      return false
    }
    
    // this.togglePurchase(index);
    return true
  }

  async addTCart(index: number, product: Product) {
    let _comment = 'N/A'
    if(product.comment){
      _comment = product.comment
    }
    const cartItem: CartItem = {
      img: product.imageSm!,
      name: product.name,
      price: product.price,
      avalaible: product.avalaible,
      quantity: product.quantity!,
      comment: _comment
    };
    setTimeout(() => {
      if( !this.cart.items.includes(cartItem)){
        this.cartService.addToCart(cartItem);
        this.cartService.getTotal(this.cart.items)
      }
    }, 3000);
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

  removeQuantity(index: number, product: Product){
    if (product.quantity) {
      if (product.quantity >= 0) {
        
        const cartItem: CartItem = {
          img: product.imageSm,
          name: product.name,
          price: product.price,
          avalaible: product.avalaible,
          quantity: product.quantity,
          comment: product.comment!
        };
        product.quantity --
      }      
    }
    if (product.quantity == 0) {
      this.togglePurchase(index)
      product.quantity = 1;
    }
    this.cartService.getTotal(this.cart.items)
  }

  addQuantity(product: Product){
    const cartItem: CartItem = {
      img: product.imageSm,
      name: product.name,
      price: product.price,
      avalaible: product.avalaible,
      quantity: product.quantity!,
      comment: product.comment!
    };
    if (product.quantity) {
      if(product.quantity < 10){
        product.quantity ++
        console.log(product.quantity);
      }
    }
    this.cartService.getTotal(this.cart.items)

  }

  constructor(private productsService: ProductsService, private cartService: CartService ){ }

  ngOnInit() {
    this.load = true
    
    this.productsService.getServings().then(() => {
      this.servings = this.productsService.servings
    });
    this.productsService.getAllCategories().then(() => {
      this.categories = this.productsService.categories
      this.fetchProductsByCategory();
    });
  }

  fetchProductsByCategory() {
    this.categories.forEach(category => {
      this.productsService
        .getAllAvalaibleProducts(category)
        .then(products => {
          this.products[category] = products;
          this.load = false;
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    });
  }

}
