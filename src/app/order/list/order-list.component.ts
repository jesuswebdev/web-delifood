import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '@delifood/store/order/order.model';
import { OrderService } from '@delifood/services/order.service';

import * as fromRoot from '@delifood/store/reducers';
import * as OrderActions from '@delifood/store/order/order.actions';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Component({
    templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit, OnDestroy {
    
    orders: Order[];
    foundNothing: boolean;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private orderService: OrderService,
        private store: Store<fromRoot.State>,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.orderService.getOrders()
        .takeUntil(this.destroy$)
        .subscribe((response) => {

            console.log(response);

            this.foundNothing = response.data === null;

            this.orders = response.data;
            this.store.dispatch(new OrderActions.GetOrdersSuccess(response.data));
        }, err => console.log(err));
    }

    onClickOrderDetails(id: string) {

        this.router.navigate(['/pedidos', id]);
    }

    ngOnDestroy() {

    }
}
