import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './details/order-details.component';
import { OrderListComponent } from './list/order-list.component';

const routes: Routes = [
    { path: '', component: OrderListComponent },
    { path: ':id', component: OrderDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule {}
