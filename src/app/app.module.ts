import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { UploadComponent } from './components/admin/upload/upload.component';
import { HomeComponent } from './components/home/home.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { BranchesComponent } from './components/branches/branches.component';
import { RikybrasaComponent } from './components/branches/components/rikybrasa/rikybrasa.component';
import { ProductsComponent } from './components/branches/components/rikybrasa/components/products/products.component';
import { FormsModule } from '@angular/forms';
import { ProductsService } from './services/products.service';
import { SupabaseService } from './services/supabase.service';
import { ManageProductsComponent } from './components/admin/manage-products/manage-products.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UploadComponent,
    HomeComponent,
    DeliveryComponent,
    BranchesComponent,
    RikybrasaComponent,
    ProductsComponent,
    ManageProductsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    ProductsService,
    SupabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
