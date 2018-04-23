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

    foundNothing: boolean = false;
    searchTerms: string = '';
    productsCount: number;
    totalPages: number;
    loadedPages: Page[];
    currentPage: Page;
    currentPageNumber: number;
    paginationIndexes: number[] = [];
    isSearch: boolean;
    loading: boolean;

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
        }, error => console.log(error));

        this.store.select(state => state.search.isSearch)
        .takeUntil(this.destroy$)
        .subscribe((isSearch) => { this.isSearch = isSearch });
    }

    ngOnInit(): void {
        
        //para mantener el numero de la pagina seleccionada en el paginador cuando le dan pa tras
        if (this.currentPageNumber != 0) {
            if (this.totalPages > 3) {
                if (this.currentPageNumber > 1 && this.currentPageNumber < this.totalPages) {
                    this.paginationIndexes = [this.currentPageNumber - 1, this.currentPageNumber, this.currentPageNumber + 1];
                }
                if (this.currentPageNumber === 1) {
                    this.paginationIndexes = [1, 2, 3];
                }
                if (this.currentPageNumber === this.totalPages) {
                    this.paginationIndexes = [this.currentPageNumber - 2, this.currentPageNumber - 1, this.currentPageNumber];
                }
            }
            else if (this.totalPages === 2) {
                this.paginationIndexes = [1, 2];
            }
            else {
                this.paginationIndexes = [1];
            }
        }

        /**
         * si cuando inicia el componente, el numero de la pagina es 0, o es una busqueda
         * entonces hace un llamado a la api para obtener los productos y asi substituir
         * las paginas cargadas y el numero de pagina seleccionado
         */

        
        this.store.select(state => state.search.terms)
        .takeUntil(this.destroy$)
        .subscribe((terms) => {

            if (this.currentPageNumber === 0 || this.isSearch) {
                this.foundNothing = false;
                this.searchTerms = terms;
                this.loading = true;
    
                if (terms != '') {
                    this.productService.findByName(terms, true, 0, this.paginatorLimit)
                    .takeUntil(this.destroy$)
                    .subscribe((response) => {
                        
                        this.loading = false;

                        if (response.data.count === 0){
                            this.foundNothing = true;
                        }
                        
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
                        
                        this.loading = false;
                        
                        if (response.data.count === 0){
                            this.foundNothing = true;
                        }
                        
                        let firstPage: Page = {
                            products: response.data.results,
                            number: 1,
                            hasNext: response.data.count > this.paginatorLimit ? true : false,
                            hasPrevious: false
                        }
    
                        this.productsCount = response.data.count;
                        this.totalPages = Math.ceil(response.data.count / this.paginatorLimit);
                        this.paginationIndexes = this.totalPages >= 3 ? [1, 2, 3] : this.totalPages > 1 ? [1, 2] : [1];
    
                        this.store.dispatch(new SearchActions.SearchDoneLoading());
                        this.store.dispatch(new PaginatorActions.SetFirstPage(firstPage));
                        this.store.dispatch(new PaginatorActions.SetSearchResultsCount(response.data.count));
                    }, error => console.log(error));
                }
            }
        });
    }

    onClickPreviousPage() {

        if (this.currentPage.hasPrevious) {
            let previousPageNumber = this.currentPageNumber - 1;

            this.changePage(previousPageNumber);
        }
    }

    onClickNextPage() {

        if (this.currentPage.hasNext) {
            let nextPageNumber = this.currentPageNumber + 1;

            this.changePage(nextPageNumber);
        }
    }

    changePage(nextPageNumber: number) {

        if (this.totalPages > 3) {
            if (nextPageNumber > 1 && nextPageNumber < this.totalPages) {
                this.paginationIndexes = [nextPageNumber - 1, nextPageNumber, nextPageNumber + 1];
            }
            if (nextPageNumber === 1) {
                this.paginationIndexes = [1, 2, 3];
            }
            if (nextPageNumber === this.totalPages) {
                this.paginationIndexes = [nextPageNumber - 2, nextPageNumber - 1, nextPageNumber];
            }
        }

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
