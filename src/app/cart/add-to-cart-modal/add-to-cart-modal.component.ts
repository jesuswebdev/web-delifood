import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

import * as CartActions from '@delifood/store/cart/cart.actions';
import * as fromRoot from '@delifood/store/reducers';
import { Product } from '@delifood/store/product/product.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { CartItem } from '@delifood/store/cart/cart.model';

@Component({
    selector: 'delifood-add-to-cart-modal',
    templateUrl: './add-to-cart-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToCartModalComponent implements OnInit, OnDestroy {

    isActive: boolean = false;
    product: Product;
    quantity: number = 0;
    total: number = 0;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private store: Store<fromRoot.State>,
        private cd: ChangeDetectorRef
    ) {
        this.store.select(state => state.cart.modalIsActive)
        .takeUntil(this.destroy$)
        .subscribe((active) => {
            
            this.isActive = active;
            this.cd.markForCheck();
        }, error => console.log(error));

        this.store.select(state => state.cart.tempProduct)
        .takeUntil(this.destroy$)
        .subscribe((product) => {
            
            if (product) {
                this.product = product;
                this.quantity = 1;
                this.total = product.price;
                this.cd.markForCheck();
            }
        }, error => console.log(error));
    }

    ngOnInit(): void { }

    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    onDismissModal() {

        this.store.dispatch(new CartActions.DismissCartModal());
    }

    onClickCancelButton() {

        this.store.dispatch(new CartActions.DismissCartModal());
    }

    onClickAddToCartButton() {

        let cartItem: CartItem = {
            item: this.product,
            quantity: this.quantity,
            total: this.total
        };

        this.store.dispatch(new CartActions.AddItemToCart(cartItem));
        this.onDismissModal();
    }
    
    onQuantityChange() {
        
        this.total = this.product.price * this.quantity;
        this.cd.markForCheck();
    }
}
