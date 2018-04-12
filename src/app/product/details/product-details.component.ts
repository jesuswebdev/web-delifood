import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import * as fromRoot from '@delifood/store/reducers';
import { Store } from '@ngrx/store';
import { Product } from '@delifood/store/product/product.model';
import { ProductService } from '@delifood/services/product.service';
import { environment } from 'environments/environment';

@Component({
    templateUrl: 'product-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductDetailsComponent implements OnInit {

    product: Product;
    done: boolean = false;

    apiUrl: string = environment.API_URL;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private route: ActivatedRoute,
        private store: Store<fromRoot.State>,
        private productsService: ProductService,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit() {

        this.route.params
        .takeUntil(this.destroy$)
        .subscribe((params) => {

            this.store.select(fromRoot.selectProducts)
            .takeUntil(this.destroy$)
            .subscribe((products) => {
                
                if (products.length === 0) {

                    this.productsService.findBySlug(params['slug'])
                    .takeUntil(this.destroy$)
                    .subscribe((response) => {
                        
                        this.product = response.data;
                        this.done = true;
                        this.cd.markForCheck();
                    }, error => console.log(error));
                }
                else {
                    this.product = products.find(product => product.slug === params['slug']);
                    this.done = true;
                    this.cd.markForCheck();
                }
            }, error => console.log(error))
        }, error => console.log(error));
    }
}
