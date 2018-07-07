import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '@delifood/services/product.service';
import { Subject } from 'rxjs';
import * as CommentActions from '@delifood/store/comments/comment.actions';
import * as PaginatorActions from '@delifood/store/paginator/paginator.actions';
import * as fromRoot from '@delifood/store/reducers';
import { Store } from '@ngrx/store';

@Component({
    selector: 'delifood-comment-editor',
    templateUrl: './comment-editor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CommentEditorComponent implements OnInit, OnDestroy {

    comment: string = '';
    rating: number = 0;
    @Input() productId: string;

    hasError: boolean = false;
    loading: boolean = false;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private productService: ProductService,
        private store: Store<fromRoot.State>,
        private cd: ChangeDetectorRef

    ) { }

    ngOnInit(): void { }

    sendComment () {

        this.loading = true;
        this.cd.markForCheck();

        this.productService.sendComment(this.prepareComment())
        .takeUntil(this.destroy$)
        .subscribe(response => {

            this.loading = false;
            this.comment = '';
            this.rating = 0;
            this.store.dispatch(new CommentActions.SendCommentSuccess(response.data));
            this.store.dispatch(new PaginatorActions.SendCommentSuccess(response.data));
            this.cd.markForCheck();
            
        }, (err) => {
            this.hasError = true;
            this.loading = false;
            this.cd.markForCheck();
        });

    }

    dismissError() {
        
        this.hasError = false;
    }

    prepareComment () {

        let userId = JSON.parse(localStorage.getItem('user')).id;

        return {
            product: this.productId,
            user: userId,
            text: this.comment,
            rating: this.rating
        }
    }

    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
