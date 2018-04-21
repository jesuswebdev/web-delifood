import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import * as CartActions from '@delifood/store/cart/cart.actions';
import * as OrderActions from '@delifood/store/order/order.actions';
import * as fromRoot from '@delifood/store/reducers';
import { Cart, CartItem } from '@delifood/store/cart/cart.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { OrderService } from '@delifood/services/order.service';

@Component({
    templateUrl: './cart-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsComponent implements OnInit, OnDestroy {

    // cartItems: CartItem[];
    totalItems: number = 0;
    totalPayment: number = 0;

    cartArray: FormArray;
    cartDetailsForm: FormGroup;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private store: Store<fromRoot.State>,
        private cd: ChangeDetectorRef,
        private fb: FormBuilder,
        private orderService: OrderService
    ) {

        this.createForm();

        this.store.select(state => state.cart)
        .takeUntil(this.destroy$)
        .subscribe((cart) => {
            
            this.totalItems = cart.itemCount;
            this.totalPayment = cart.totalPayment;

            if (cart.items.length > 0) {

                let itemFG = cart.items.map(item => {
                    return this.fb.group({
                        item: [item.item],
                        quantity: [item.quantity, [Validators.required, Validators.min(1), Validators.max(100)]],
                        total: [item.total]
                    })
                });
                let itemFormArray = this.fb.array(itemFG);
                this.cartDetailsForm.setControl('items',itemFormArray);
            }
            else if (cart.items.length === 0) {
                this.cartDetailsForm.setControl('items', this.fb.array([]));
            }

            this.cd.markForCheck();
        });

    }

    createForm() {
        
        this.cartDetailsForm = this.fb.group({
            items: this.fb.array([])
        });
    }

    onChangeItemQuantity(item: CartItem) {
        
        this.store.dispatch(new CartActions.ChangeCartItemQuantity(item));
    }

    onDeleteItemFromCart(item: CartItem) {
        
        this.store.dispatch(new CartActions.ActivateRemoveItemFromCartModal(item.item));
    }

    ngOnInit(): void {
        
    }

    onClickOrder() {
        
        this.store.dispatch(new OrderActions.ActivateSendOrderModal(this.prepareOrder()));
    }

    prepareOrder(): Cart {
        
        let products = this.cartDetailsForm.get('items').value.map((item: CartItem) => {
            return {
                product: item.item._id,
                unitPrice: item.item.price,
                quantity: item.quantity,
                totalPrice: item.total
            };
        });
        
        return {
            products: products,
            totalPayment: this.totalPayment
        };
    }

    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }


    get cartItems(): FormArray {

        return this.cartDetailsForm.get('items') as FormArray;
    }
}
