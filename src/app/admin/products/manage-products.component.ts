import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '@delifood/store/product/product.model';
import { Store } from '@ngrx/store';

import * as fromRoot from '@delifood/store/reducers';
import * as ProductActions from '@delifood/store/product/product.actions';
import { Router } from '@angular/router';
import { ProductService } from '@delifood/services/product.service';

@Component({
    templateUrl: './manage-products.component.html'
})
export class ManageProductsComponent implements OnInit {

    products: Observable<Product[]>;
    count: Observable<number>;
    
    hasError: boolean = false;

    constructor(
        private productService: ProductService,
        private store: Store<fromRoot.State>,
        private router: Router
    ) {

        this.products = this.store.select(fromRoot.selectProducts);
        this.count = this.store.select(state => state.product.count);
    }

    ngOnInit(): void {

        this.productService.getProducts().subscribe((response) => {

            console.log(response);
            this.store.dispatch(new ProductActions.GetProductsSuccess(response.data));
            this.store.dispatch(new ProductActions.SetProductsCount(response.data.length));
        }, (error) => {

            this.hasError = true;
            console.log(error);
        });
    }

    onCreateProduct() {

        this.router.navigate(['/admin/comidas/crear']);
    }

    onDeleteProduct(product: Product) {

        let didConfirm = confirm(`¿Esta seguro que quiere eliminar el producto: ${product.name}?`);

        if (didConfirm) {
            this.productService.deleteProduct(product.id).subscribe((response) => {
    
                this.store.dispatch(new ProductActions.DeleteProductSuccess(product.id));
            }, (error) => {
    
                console.log(error);
            });
        }
    }

    onEditProduct(id: string) {

        this.router.navigate(['/admin/comidas/modificar', id]);
    }
}
