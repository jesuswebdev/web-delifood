import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

import * as CartActions from '@delifood/store/cart/cart.actions';
import * as fromRoot from '@delifood/store/reducers';
import { Product } from '@delifood/store/product/product.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { CartItem } from '@delifood/store/cart/cart.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'delifood-add-to-cart-modal',
    templateUrl: './add-to-cart-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToCartModalComponent implements OnInit, OnDestroy {

    isActive: boolean = false;
    submitted: boolean = false;
    addToCartForm: FormGroup;
    total: number;
    // product: CartItem;
    product: Product;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private store: Store<fromRoot.State>,
        private cd: ChangeDetectorRef,
        private fb: FormBuilder
    ) {
        this.store.select(state => state.cart.modalIsActive)
        .takeUntil(this.destroy$)
        .subscribe((active) => {
            
            this.isActive = active;
            if (active === false) {
                this.submitted = false;
            }
            this.cd.markForCheck();
        }, error => console.log(error));

        this.createForm();
    }
    
    ngOnInit(): void {
        
        this.store.select(state => state.cart.tempProduct)
        .takeUntil(this.destroy$)
        .subscribe((product) => {
            
            if (product) {
                this.product = product;
                this.total = product.price;

                this.addToCartForm.setValue({
                    quantity: 1
                });

                this.cd.markForCheck();
            }
        }, error => console.log(error));

        this.addToCartForm.get('quantity').valueChanges
        .takeUntil(this.destroy$)
        .subscribe((qty) => {
            
            if (qty < 1 || qty > 100) {
                this.total = 0;
                this.cd.markForCheck();
            }
            else {
                if (this.product) {
                    this.total = qty * this.product.price;
                    this.cd.markForCheck();
                }
            }
        });
    }

    createForm() {

        this.addToCartForm = this.fb.group({
            quantity: ['', [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(/^[0-9]+$/)]],
        });
    }

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
            unitPrice: this.product.price,
            quantity: this.quantity.value,
            total: this.total
        };

        this.store.dispatch(new CartActions.AddItemToCart(cartItem));
        this.submitted = true;
    }
    
    onQuantityChange() {

        this.addToCartForm.patchValue({
            total: this.product.price * this.quantity.value
        });
        this.cd.markForCheck();
    }

    get quantity() { return this.addToCartForm.get('quantity'); }
}
