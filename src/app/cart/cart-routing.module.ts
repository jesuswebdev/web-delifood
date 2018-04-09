import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartDetailsComponent } from './details/cart-details.component';

const routes: Routes = [
    { path: '', component: CartDetailsComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartRoutingModule {}
