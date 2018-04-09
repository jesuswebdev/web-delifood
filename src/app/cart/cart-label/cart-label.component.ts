import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '@delifood/store/reducers';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'delifood-cart-label',
    templateUrl: './cart-label.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartLabelComponent implements OnInit, OnDestroy {

    destroy$: Subject<boolean> = new Subject<boolean>();
    count: number = 0;

    constructor(
        private store: Store<fromRoot.State>,
        private cd: ChangeDetectorRef
    ) {
        this.store.select(fromRoot.selectCartItemsCount)
        .takeUntil(this.destroy$)
        .subscribe((count) => {
            this.count = count;
            this.cd.markForCheck();
        });
    }

    ngOnInit(): void { }

    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
