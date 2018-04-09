import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { CartDetailsComponent } from './details/cart-details.component';
import { FormsModule } from '@angular/forms';
import { RemoveFromCartModalComponent } from './remove-from-cart-modal/remove-from-cart-modal.component';

@NgModule({
    declarations: [
        CartDetailsComponent,
        RemoveFromCartModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CartRoutingModule
    ],
    exports: [],
    providers: [],
})
export class CartModule {}
