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

  async getAllProducts(): Promise<Product[]> {
    let { data: products, error } = await this.supabase
      .from('Products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    if (products) {
      for (const product of products) {
        product.imageSm = await this.getImageUrl(product.imageSm);
        product.imageMd = await this.getImageUrl(product.imageMd);
        product.imageLg = await this.getImageUrl(product.imageLg);
      }
    }

    return products as Product[];
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
  
  async getUrl(imageName: string): Promise<string | null> {
    const { data, error } = await this.supabase
      .storage
      .from('product_img')
      .createSignedUrl(`public/${imageName}`, 60);
  
    if (error) {
      console.error('Problem getting the URL:', error);
      return null;
    } else {
      console.log('URL created successfully!');
      return data?.signedUrl ?? null;
    }
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
