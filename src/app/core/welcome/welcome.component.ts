import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeUntil';

import * as fromRoot from '@delifood/store/reducers';

@Component({
    templateUrl: 'welcome.component.html'
})

export class WelcomeComponent implements OnInit, OnDestroy {

    search: string = '';
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor (
        private store: Store<fromRoot.State>,
        private router: Router
    ){ }

    ngOnInit () {

        this.store.select(state => state.search.welcomeSearchSubmitted)
        .takeUntil(this.destroy$)
        .subscribe((searchSubmitted) => {

            if (searchSubmitted) {
                this.router.navigate(['/comidas']);
            }
        });
    }

    ngOnDestroy () {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
