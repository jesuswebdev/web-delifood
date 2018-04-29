import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import * as fromRoot from '@delifood/store/reducers';
import * as OrderActions from '@delifood/store/order/order.actions';
import * as CartActions from '@delifood/store/cart/cart.actions';
import * as UserActions from '@delifood/store/user/user.actions';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Cart } from '@delifood/store/cart/cart.model';
import { OrderService } from '@delifood/services/order.service';
import { Router } from '@angular/router';
import { UserService } from '@delifood/services/user.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'delifood-send-order-modal',
    templateUrl: './send-order-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendOrderModalComponent implements OnInit, OnDestroy {

    sent: boolean = false;
    active: boolean = false;
    tempId: string;

    products: number;
    payment: number;
    processingPayment: boolean;

    cart: Cart;

    destroy$: Subject<boolean> = new Subject<boolean>();

    handler: any;

    constructor(
        private store: Store<fromRoot.State>,
        private orderService: OrderService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private userService: UserService
    ) {

        this.store.select(state => state.order)
        .takeUntil(this.destroy$)
        .subscribe((order) => {

            this.active = order.sendOrderModalIsActive;
            this.cart = order.tempOrder;
            this.cd.markForCheck();
        }, err => console.log(err));
    }

    ngOnInit(): void {

        this.handler = StripeCheckout.configure({
            key: environment.stripeKey,
            image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
            locale: 'auto',
            token: token => {

                this.processingPayment = true;
                this.cd.markForCheck();

                let order = {
                    order: this.cart,
                    token: token
                };

                this.orderService.payWithStripe(order)
                .takeUntil(this.destroy$)
                .subscribe(response => {
                    
                    this.processingPayment = false;
                    this.sent = true;
                    this.tempId = response.data._id;
                    this.store.dispatch(new CartActions.ResetCart());
                    this.store.dispatch(new OrderActions.CreateOrderSuccess(response.data));
                    this.cd.markForCheck();
                }, err => {

                    this.processingPayment = false;
                });
            }
        });
    }

    payWithStripe() {

        this.handler.open({
            name: 'Delifood',
            description: 'compra de comida',
            amount: this.cart.totalPayment * 100
        });
    }

    payWithPayPal() {

    }

    onDismissModal() {
        
        this.store.dispatch(new OrderActions.DismissSendOrderModal());
    }

    onClickContinue() {

        this.onDismissModal();
        this.router.navigate(['/pedidos', this.tempId]);
    }

    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
