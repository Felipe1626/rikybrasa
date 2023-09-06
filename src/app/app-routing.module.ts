import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ProductsComponent } from './components/branches/components/rikybrasa/components/products/products.component';

const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'admin', component: AdminComponent }
]

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }