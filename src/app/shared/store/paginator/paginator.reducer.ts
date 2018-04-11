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
                loadedPages: [...state.loadedPages, action.payload]
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

        default: {
            return state;
        }
    }
}
