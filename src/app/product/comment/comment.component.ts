import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Comment } from '@delifood/store/comments/comment.model';
import * as fromRoot from '@delifood/store/reducers';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'delifood-comment',
    templateUrl: './comment.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit, OnDestroy {

    @Input() productId: string;
    comments: Comment[];

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private store: Store<fromRoot.State>,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit(): void {

        this.store.select(state => state.comments.comments)
        .takeUntil(this.destroy$)
        .subscribe(comments => {

            this.comments = comments.filter(c => c.product === this.productId);
            this.cd.markForCheck();
        })

    }

    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
