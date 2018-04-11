import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Page } from '@delifood/store/paginator/paginator.model';
import { ProductService } from '@delifood/services/product.service';
import { Store } from '@ngrx/store';

import * as fromRoot from '@delifood/store/reducers';
import * as PaginatorActions from '@delifood/store/paginator/paginator.actions';
import * as SearchActions from '@delifood/store/search/search.actions';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'delifood-product-paginator',
    templateUrl: './paginator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPaginatorComponent implements OnInit, OnDestroy {

    private paginatorLimit: number = 12;

    searchTerms: string = '';
    productsCount: number;
    totalPages: number;
    loadedPages: Page[];
    currentPage: Page;
    currentPageNumber: number;
    paginationIndexes: number[] = [];

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private productService: ProductService,
        private store: Store<fromRoot.State>,
        private cd: ChangeDetectorRef
    ) {
        this.store.select(state => state.paginator)
        .takeUntil(this.destroy$)
        .subscribe((paginator) => {

            this.productsCount = paginator.searchResultsCount;
            this.totalPages = paginator.totalPages;
            this.loadedPages = paginator.loadedPages;
            this.currentPage = paginator.currentPage;
            this.currentPageNumber = paginator.currentPageNumber;
            this.cd.markForCheck();
        }, error => console.log(error))
    }

    ngOnInit(): void {

        this.store.select(state => state.search.terms)
        .takeUntil(this.destroy$)
        .subscribe((terms) => {

            this.searchTerms = terms;

            if (terms != '') {
                this.productService.findByName(terms, true, 0, this.paginatorLimit)
                .takeUntil(this.destroy$)
                .subscribe((response) => {
                    
                    let firstPage: Page = {
                        products: response.data.results,
                        number: 1,
                        hasNext: response.data.count > this.paginatorLimit ? true : false,
                        hasPrevious: false
                    }
        
                    this.productsCount = response.data.count;
                    this.totalPages = Math.ceil(response.data.count / this.paginatorLimit);
        
                    this.paginationIndexes = this.totalPages > 3 ? [1, 2, 3] : this.totalPages > 1 ? [1, 2] : [1];
        
                    this.store.dispatch(new SearchActions.SearchDoneLoading());
                    this.store.dispatch(new PaginatorActions.SetFirstPage(firstPage));
                    this.store.dispatch(new PaginatorActions.SetSearchResultsCount(response.data.count));
                }, error => console.log(error));
            }
            else {
                this.productService.find(true, 0, this.paginatorLimit)
                .takeUntil(this.destroy$)
                .subscribe((response) => {

                    let firstPage: Page = {
                        products: response.data.results,
                        number: 1,
                        hasNext: response.data.count > this.paginatorLimit ? true : false,
                        hasPrevious: false
                    }

                    this.productsCount = response.data.count;
                    this.totalPages = Math.ceil(response.data.count / this.paginatorLimit);

                    this.paginationIndexes = this.totalPages > 3 ? [1, 2, 3] : this.totalPages > 1 ? [1, 2] : [1];

                    this.store.dispatch(new SearchActions.SearchDoneLoading());
                    this.store.dispatch(new PaginatorActions.SetFirstPage(firstPage));
                    this.store.dispatch(new PaginatorActions.SetSearchResultsCount(response.data.count));
                }, error => console.log(error));
            }
        });
    }

    onClickPreviousPage() {

        if (this.currentPage.hasPrevious) {
            let previusPageNumber = this.currentPageNumber - 1;

            this.changePage(previusPageNumber);
        }
    }

    onClickNextPage() {

        if (this.currentPage.hasNext) {
            let nextPageNumber = this.currentPageNumber + 1;

            this.changePage(nextPageNumber);
        }
    }
    
    onClickPaginationLink(pageNumber: number) {

        if (pageNumber > this.currentPageNumber) {
            if (this.totalPages > pageNumber) {
                this.paginationIndexes = this.paginationIndexes.slice(1).concat(pageNumber + 1);
            }
        }
        if (pageNumber < this.currentPageNumber) {
            if (pageNumber > 1) {
                this.paginationIndexes = [pageNumber - 1].concat(this.paginationIndexes.slice(0,1));
            }
        }
        this.changePage(pageNumber);
    }

    changePage(nextPageNumber: number) {

        if (!this.loadedPages.find(page => page.number === nextPageNumber)){
            
            let offset = (nextPageNumber * this.paginatorLimit) - this.paginatorLimit;

            if (this.searchTerms != '') {
                //si se esta buscando por nombre
                this.productService.findByName(this.searchTerms, false, offset, this.paginatorLimit)
                .takeUntil(this.destroy$)
                .subscribe((response) => {
    
                    let loadedPage = {
                        products: response.data,
                        number: nextPageNumber,
                        hasNext: nextPageNumber < this.totalPages,
                        hasPrevious: true
                    }

                    this.store.dispatch(new PaginatorActions.AddLoadedPage(loadedPage));
                    this.store.dispatch(new PaginatorActions.SetCurrentPage(nextPageNumber));
    
                }, error => console.log(error));
            }
            else {
                this.productService.find(false, offset, this.paginatorLimit)
                .takeUntil(this.destroy$)
                .subscribe((response) => {
    
                    let loadedPage = {
                        products: response.data,
                        number: nextPageNumber,
                        hasNext: nextPageNumber < this.totalPages,
                        hasPrevious: true
                    }
                    
                    this.store.dispatch(new PaginatorActions.AddLoadedPage(loadedPage));
                    this.store.dispatch(new PaginatorActions.SetCurrentPage(nextPageNumber));
                }, error => console.log(error));
            }

        }
        else {
            this.store.dispatch(new PaginatorActions.SetCurrentPage(nextPageNumber));
        }
    }

    ngOnDestroy() {

        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
