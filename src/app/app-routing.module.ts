import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { RikybrasaComponent } from './components/branches/components/rikybrasa/rikybrasa.component';
import { ManageProductsComponent } from './components/admin/manage-products/manage-products.component';

const routes: Routes = [
    { path: '', component: RikybrasaComponent },
    { path: 'admin/rikybrasa/324928', component: AdminComponent },
    { path: 'productos', component: ManageProductsComponent}
]

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }