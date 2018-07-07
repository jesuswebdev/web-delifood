import { Page } from "@delifood/store/paginator/paginator.model";

import * as Paginator from './paginator.actions';

export interface State {
    searchResultsCount: number;
    totalPages: number;
    loadedPages: Page[],
    currentPage: Page;
    currentPageNumber: number;
};

const initialState: State = {
        searchResultsCount: 0,
        totalPages: 0,
        loadedPages: [],
        currentPage: undefined,
        currentPageNumber: 0
};

export function reducer(state = initialState, action: Paginator.All ): State {

    switch (action.type) {

        case Paginator.PaginatorActionTypes.SET_FIRST_PAGE: {

            return {
                ...state,
                currentPage: action.payload,
                currentPageNumber: action.payload.number,
                loadedPages: [action.payload]
            };
        }

        case Paginator.PaginatorActionTypes.SET_SEARCH_RESULTS_COUNT: {

            return {
                ...state,
                searchResultsCount: action.payload,
                totalPages: Math.ceil(action.payload/12)
            }
        }

        case Paginator.PaginatorActionTypes.ADD_LOADED_PAGE: {

            return {
                ...state,
                loadedPages: [...state.loadedPages, action.payload]
            };
        }

        case Paginator.PaginatorActionTypes.SET_CURRENT_PAGE: {

            return {
                ...state,
                currentPageNumber: action.payload,
                currentPage: state.loadedPages.find(page => page.number === action.payload)
            }
        }

        case Paginator.PaginatorActionTypes.SEND_COMMENT_SUCCESS: {

            state.loadedPages.forEach((page: Page) => {
                let producto = page.products.find(p => p._id === action.payload.product);

                if (producto) {

                    page.products.find(p => {
                        if (p._id === action.payload.product) {
                            console.log(p);
                            p.comments = p.comments ? [action.payload, ...p.comments] : [action.payload];
                            // p.comments.push(action.payload);
                            p.commentsCount += 1;
                            p.totalRating += action.payload.rating;
                            p.rating = p.totalRating / p.commentsCount;
                            console.log(p);
                            return true;
                        }
                    })
                    // let productos = page.products.filter(p => p._id !== action.payload.product);
    
                    // producto.comments = producto.comments ? [...producto.comments, action.payload] : [ action.payload ];
                    // producto.commentsCount += 1;
                    // producto.totalRating += action.payload.rating;
                    // producto.rating = producto.totalRating / producto.commentsCount;

                    // productos.push(producto);

                    // page.products = productos;
                }

            });

            return {
                ...state
            };
        }

        default: {
            return state;
        }
    }
}
