import { Injectable, Type } from '@angular/core';
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

  async getAllAvalaibleProducts(category: string): Promise<Product[]> {
    let { data: _products, error } = await this.supabase
      .from('Products')
      .select('*').eq('avalaible', true).eq('Category', category)

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    const imageFetchPromises = _products!.map(async (product) => {
      product.imageSm = await this.getImageUrl(product.imageSm);
      product.imageMd = await this.getImageUrl(product.imageMd);
      product.imageLg = await this.getImageUrl(product.imageLg);
      return product;
    });
  
    const products = await Promise.all(imageFetchPromises);
  
    return products;

  }

  async getAllProducts(): Promise<Product[]> {
    // const Products = await this.supabase.channel('custom-all-channel')
    // .on(
    //   'postgres_changes',
    //   { event: '*', schema: 'public', table: 'Products' },
    //   (payload) => {
    //     console.log('Change received!', payload)
    //   }
    // )
    // .subscribe((update) => {
    //   console.log('UPDATE', update);
    // })
    
    let { data: _products, error } = await this.supabase
      .from('Products')
      .select('*')

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    const imageFetchPromises = _products!.map(async (product) => {
      product.imageSm = await this.getImageUrl(product.imageSm);
      product.imageMd = await this.getImageUrl(product.imageMd);
      product.imageLg = await this.getImageUrl(product.imageLg);
      return product;
    });
  
    const products = await Promise.all(imageFetchPromises);
  
    return products;

  }

  
  categories: string[] = []
  servings: string[] = []

  async getServings(){
    this.servings = []
    let { data, error } = await this.supabase
    .from('Products')
    .select('name').eq('Category', 'porciones')
    if (data) {
      this.servings = data.map(item => item.name);
    }
  }
  async getAllCategories() {
    this.categories = []
    let { data, error } = await this.supabase
      .from('Products')
      .select('Category')
      if (data) {
        const uniqueCategories = [...new Set(data.map((item: any) => item.Category))];
        this.categories = uniqueCategories;        
      }
      
    if (error) {
      console.error('Error fetching categories:', error);
      return;
    }
  
  }
  
  

  async getImageUrl(imageName: string): Promise<string> {
    const { data, error } = await this.supabase
      .storage
      .from('product_img')
      .createSignedUrl(`public/${imageName}`, 60);

    if (error) {
      console.error(`Error getting the signed URL for image: ${imageName}`);
      return 'error';
    }
    return data.signedUrl;
  }


  async addImage(name: string, data: Blob | null): Promise<string | undefined> {
    if (!data) {
      return undefined;
    }
  
    const { data: response, error } = await this.supabase
      .storage
      .from('product_img')
      .upload(`public/${name}`, data, {
        cacheControl: '3600',
        upsert: false,
      });
  
    if (error) {
      console.error('Error uploading an image:', error);
      return undefined;
    }
  
    return 
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
