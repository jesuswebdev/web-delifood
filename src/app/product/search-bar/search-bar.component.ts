import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRoot from '@delifood/store/reducers';
import * as SearchActions from '@delifood/store/search/search.actions';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'delifood-search-bar',
    templateUrl: './search-bar.component.html'
})
export class SearchBarComponent implements OnInit, OnDestroy {

    searchProductForm: FormGroup;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private fb: FormBuilder,
        private store: Store<fromRoot.State>,
        private router: Router
    ) {
        this.createForm();
    }

    createForm() {

        this.searchProductForm = this.fb.group({
            search: ['']
        })
    }

    onSubmit() {
        
        if (this.router.url === '/') {
            this.store.dispatch(new SearchActions.WelcomeSearchSubmitted());
        }
        
        this.store.dispatch(new SearchActions.Search(this.searchProductForm.get('search').value));
    }

    ngOnInit(): void {

        this.store.select(state => state.search)
        .takeUntil(this.destroy$)
        .subscribe((search) => {

            if (search.welcomeSearchSubmitted) {
                this.store.dispatch(new SearchActions.WelcomeSearchReceived());
            }

            if (this.router.url != '/') {
                this.searchProductForm.setValue({
                    search: search.terms
                });
            }
        });
    }

    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
