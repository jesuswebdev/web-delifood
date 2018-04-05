import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProductsComponent } from './manage-products.component';
import { CreateProductComponent } from './create/create-product.component';
import { EditProductComponent } from './edit/edit-product.component';

const routes: Routes = [
  { path: '', component: ManageProductsComponent },
  { path: 'crear', component: CreateProductComponent },
  { path: 'modificar/:id', component: EditProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProductsRoutingModule { }
