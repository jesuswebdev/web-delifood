import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OrderDetailsComponent } from './details/order-details.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './list/order-list.component';

@NgModule({
    declarations: [
        OrderDetailsComponent,
        OrderListComponent
    ],
    imports: [ 
        SharedModule,
        OrderRoutingModule
    ],
    exports: [],
    providers: [],
})
export class OrderModule {}
