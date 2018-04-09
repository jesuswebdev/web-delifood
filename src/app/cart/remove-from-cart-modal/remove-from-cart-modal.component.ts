import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '@delifood/store/product/product.model';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import * as fromRoot from '@delifood/store/reducers';
import * as CartActions from '@delifood/store/cart/cart.actions';
import { CartItem } from '@delifood/store/cart/cart.model';

@Component({
    selector: 'delifood-remove-from-cart-modal',
    templateUrl: './remove-from-cart-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveFromCartModalComponent implements OnInit, OnDestroy {
    
    isActive: boolean = false;
    product: Product;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private store: Store<fromRoot.State>,
        private cd: ChangeDetectorRef
    ) {
        this.store.select(state => state.cart.removeCartItemModalIsActive)
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

        this.store.dispatch(new CartActions.DismissRemoveItemFromCartModal());
    }

    onClickRemoveFromCartButton() {

        this.store.dispatch(new CartActions.RemoveItemFromCart(this.product.id));
        this.onDismissModal();
    }
}
