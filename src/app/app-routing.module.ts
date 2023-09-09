import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { RikybrasaComponent } from './components/branches/components/rikybrasa/rikybrasa.component';

const routes: Routes = [
    { path: '', component: RikybrasaComponent },
    { path: 'admin', component: AdminComponent }
]

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }