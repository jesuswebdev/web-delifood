import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import * as CartActions from '@delifood/store/cart/cart.actions';
import * as fromRoot from '@delifood/store/reducers';
import { Cart, CartItem } from '@delifood/store/cart/cart.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
    templateUrl: './cart-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsComponent implements OnInit, OnDestroy {

    cartItems: CartItem[];
    totalItems: number = 0;
    totalPayment: number = 0;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private store: Store<fromRoot.State>,
        private cd: ChangeDetectorRef
    ) {

        this.store.select(state => state.cart)
        .takeUntil(this.destroy$)
        .subscribe((cart) => {
            
            this.cartItems = cart.items;
            this.totalItems = cart.itemCount;
            this.totalPayment = cart.totalPayment;
            this.cd.markForCheck();
        })
    }

    onChangeItemQuantity(item: CartItem) {
        
        this.store.dispatch(new CartActions.ChangeCartItemQuantity(item));
    }

    onDeleteItemFromCart(item: CartItem) {
        
        this.store.dispatch(new CartActions.ActivateRemoveItemFromCartModal(item.item));
    }

    ngOnInit(): void { }

    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
