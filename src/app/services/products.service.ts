import { Injectable } from '@angular/core';
import { Product } from '../models/products/products.model';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../models/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  supabase = createClient(environment.supabaseUrl, environment.supabaseKey)

  product: Product[] = []
  constructor() { }

  async getAllProducts(): Promise<Product[]>{
    let { data: products, error } = await this.supabase
    .from('Products')
    .select('*')

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  
    return products as Product[]

  }

  async addProduct(product: Product){
    this.product.push(product);
    const { data, error } = await this.supabase
    .from('Products')
    .insert(product)
    .select()
    if (error) {
      console.error('here we have an error:', error)
    }else{
      console.log('Productd added');
    }
  }

  async updateProduct(name: string, updateProduct: Product){
    const { data, error } = await this.supabase
    .from('Products')
    .update({ name: updateProduct })
    .eq('name', name)
    .select()
    if (error) {
      console.error('here we have an error on updateProduct():', error)
    }else{
      console.log('Productd updated');

    }
  }

  async deleteProduct(name:string){
    const { error } = await this.supabase
    .from('Products')
    .delete()
    .eq( 'name', name)
    if (error) {
      console.error('here we have an error on deleteProduct():', error)
    }else{
      console.log('Productd Deleted succesfully');
    }
  }
}
