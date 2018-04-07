import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './list/product-list.component'
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './details/product-details.component';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductCardComponent,
        ProductDetailsComponent
    ],
    imports: [
        CommonModule,
        ProductRoutingModule
    ],
    exports: [],
    providers: [],
})
export class ProductModule {}
