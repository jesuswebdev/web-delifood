import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import * as fromRoot from '@delifood/store/reducers';
import { Store } from '@ngrx/store';
import { Product } from '@delifood/store/product/product.model';
import { ProductService } from '@delifood/services/product.service';
import { environment } from 'environments/environment';
import { Comment } from '@delifood/store/comments/comment.model';
import * as ProductActions from '@delifood/store/product/product.actions';
import * as CommentActions from '@delifood/store/comments/comment.actions';

@Component({
    templateUrl: 'product-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductDetailsComponent implements OnInit, OnDestroy {

    product: Product;
    // comments: Comment[];
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

                        // this.store.dispatch(new ProductActions.GetProductsSuccess([response.data]));
                        
                        this.product = response.data;
                        this.done = true;
                        this.getComments();
                        this.cd.markForCheck();
                    }, error => console.log(error));
                }
                else {
                    this.product = products.find(product => product.slug === params['slug']);
                    this.done = true;
                    this.getComments();
                    this.cd.markForCheck();
                }
            }, error => console.log(error))
        }, error => console.log(error));
    }

    getComments () {

        if (this.product.commentsCount > 0) {

            this.store.select(state => state.comments.comments)
            .takeUntil(this.destroy$)
            .subscribe(comments => {

                let comentarios = comments.filter(c => c.product === this.product._id);

                if (comentarios.length !== this.product.commentsCount) {

                    this.productsService.getProductComments(this.product._id)
                    .takeUntil(this.destroy$)
                    .subscribe((response) => {
        
                        this.store.dispatch(new CommentActions.LoadComments(response.data));
                    });
                }
            })
        }
    }

    ngOnDestroy () {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.store.dispatch(new ProductActions.UnloadProductInfo());
    }
}
