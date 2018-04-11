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

        // let body = document.getElementById('delifood-body').style;
        
        // body.width                = '100%';
        // body.position             = 'fixed';
        // body.minHeight            = '100%';
        // body.backgroundSize       = 'cover';
        // body.backgroundImage      = `url('/assets/bg1.jpg')`;
        // body.backgroundRepeat     = 'no-repeat';
        // body.backgroundPosition   = 'center center';
        // body.backgroundAttachment = 'fixed';
    }

    ngOnDestroy () {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        
        // let body = document.getElementById('delifood-body').style;
        
        // body.width                = '';
        // body.position             = '';
        // body.minHeight            = '';
        // body.backgroundSize       = '';
        // body.backgroundImage      = '';
        // body.backgroundRepeat     = '';
        // body.backgroundPosition   = '';
        // body.backgroundAttachment = '';
    }
}
