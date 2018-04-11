import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './list/product-list.component'
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './details/product-details.component';
import { ProductPaginatorComponent } from './paginator/paginator.component';

import { AddToCartButtonComponent } from '../cart/add-to-cart-button/add-to-cart-button.component';
import { AddToCartModalComponent } from '../cart/add-to-cart-modal/add-to-cart-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductCardComponent,
        ProductDetailsComponent,
        AddToCartButtonComponent,
        AddToCartModalComponent,
        ProductPaginatorComponent
    ],
    imports: [
        SharedModule,
        ProductRoutingModule
    ],
    exports: [],
    providers: [],
})
export class ProductModule {}
