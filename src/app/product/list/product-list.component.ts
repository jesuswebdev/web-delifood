import { Component, OnInit } from '@angular/core';
import { Product } from '@delifood/store/product/product.model';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '@delifood/store/reducers';
import * as ProductActions from '@delifood/store/product/product.actions';
import { Store } from '@ngrx/store';
import { ProductService } from '@delifood/services/product.service';

@Component({
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

    products: Observable<Product[]>

    constructor(
        private store: Store<fromRoot.State>,
        private productService: ProductService
    ) {

        this.products = this.store.select(fromRoot.selectProducts);
    }

    ngOnInit(): void {

        this.productService.getProducts().subscribe((response) => {

            this.store.dispatch(new ProductActions.GetProductsSuccess(response.data));
        }, (error) => {

            console.log(error);
        })
    }
}
