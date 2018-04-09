import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './list/product-list.component'
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './details/product-details.component';

import { AddToCartButtonComponent } from '../cart/add-to-cart-button/add-to-cart-button.component';
import { AddToCartModalComponent } from '../cart/add-to-cart-modal/add-to-cart-modal.component';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductCardComponent,
        ProductDetailsComponent,
        AddToCartButtonComponent,
        AddToCartModalComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ProductRoutingModule
    ],
    exports: [],
    providers: [],
})
export class ProductModule {}
