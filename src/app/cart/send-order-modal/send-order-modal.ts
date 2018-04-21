import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import * as fromRoot from '@delifood/store/reducers';
import * as OrderActions from '@delifood/store/order/order.actions';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Cart } from '@delifood/store/cart/cart.model';
import { OrderService } from '@delifood/services/order.service';

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
        private cd: ChangeDetectorRef
    ) {

        this.store.select(state => state.order)
        .takeUntil(this.destroy$)
        .subscribe((order) => {

            this.active = order.sendOrderModalIsActive;
            this.cart = order.tempOrder;
            // this.products = order.tempOrder.products.length;
            // this.payment = order.tempOrder.totalPayment;
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
                    this.cd.markForCheck();
                    console.log(response);
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
