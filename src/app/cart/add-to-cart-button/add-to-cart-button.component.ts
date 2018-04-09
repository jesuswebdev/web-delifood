import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '@delifood/store/product/product.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '@delifood/store/reducers';
import * as CartActions from '@delifood/store/cart/cart.actions';

@Component({
    selector: 'delifood-add-to-cart-button',
    templateUrl: './add-to-cart-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToCartButtonComponent implements OnInit {

    @Input() product: Product;

    constructor(
        private store: Store<fromRoot.State>
    ) {

    }

    ngOnInit(): void { }

    onAddToCart() {
        
        this.store.dispatch(new CartActions.ActivateCartModal(this.product));
    }
}
