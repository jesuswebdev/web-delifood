import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './list/product-list.component';
import { ProductDetailsComponent } from './details/product-details.component';

const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: ':slug', component: ProductDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {}
