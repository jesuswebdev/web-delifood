import { NgModule } from '@angular/core';
import { CartRoutingModule } from './cart-routing.module';
import { CartDetailsComponent } from './details/cart-details.component';
import { RemoveFromCartModalComponent } from './remove-from-cart-modal/remove-from-cart-modal.component';
import { SharedModule } from '../shared/shared.module';
import { SendOrderModalComponent } from './send-order-modal/send-order-modal';

@NgModule({
    declarations: [
        CartDetailsComponent,
        RemoveFromCartModalComponent,
        SendOrderModalComponent
    ],
    imports: [
        SharedModule,
        CartRoutingModule
    ],
    exports: [],
    providers: [],
})
export class CartModule {}
