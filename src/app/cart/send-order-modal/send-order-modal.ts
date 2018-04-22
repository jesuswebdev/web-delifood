import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import * as fromRoot from '@delifood/store/reducers';
import * as OrderActions from '@delifood/store/order/order.actions';
import * as CartActions from '@delifood/store/cart/cart.actions';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Cart } from '@delifood/store/cart/cart.model';
import { OrderService } from '@delifood/services/order.service';
import { Router } from '@angular/router';

@Component({
    selector: 'delifood-send-order-modal',
    templateUrl: './send-order-modal.component.html'
})
export class SendOrderModalComponent implements OnInit, OnDestroy {

    loading: boolean = false;
    sent: boolean = false;
    active: boolean = false;

    products: number;
    payment: number;

    cart: Cart;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private store: Store<fromRoot.State>,
        private orderService: OrderService,
        private cd: ChangeDetectorRef,
        private router: Router
    ) {

        this.store.select(state => state.order)
        .takeUntil(this.destroy$)
        .subscribe((order) => {

            this.active = order.sendOrderModalIsActive;
            this.cart = order.tempOrder;
        }, err => console.log(err));
    }

    ngOnInit(): void { }

    sendOrder() {

        this.loading = true;

        this.orderService.sendOrder(this.cart)
        .takeUntil(this.destroy$)
        .subscribe((response) => {

            if (response.statusCode === 201) {

                setTimeout(() => {
                    this.loading = false;
                    this.sent = true;
                    this.store.dispatch(new CartActions.ResetCart());
                    this.store.dispatch(new OrderActions.CreateOrderSuccess(response.data));
                    this.cd.markForCheck();
                    this.router.navigate(['/pedidos', response.data._id]);
                }, 1000);
            }
        }, err => {console.log(err); this.loading = false;});
    }

    onDismissModal() {
        
        this.store.dispatch(new OrderActions.DismissSendOrderModal());
    }

    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
