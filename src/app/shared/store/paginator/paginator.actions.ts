import { Action } from '@ngrx/store';
import { Page } from '@delifood/store/paginator/paginator.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum PaginatorActionTypes {
    SET_FIRST_PAGE = '[Paginator] SET FIRST PAGE',
    SET_SEARCH_RESULTS_COUNT = '[Paginator] SET SEARCH RESULTS COUNT',
    ADD_LOADED_PAGE = '[Paginator] ADD LOADED PAGE',
    SET_CURRENT_PAGE = '[Paginator] SET CURRENT PAGE'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class SetFirstPage implements Action {
    readonly type = PaginatorActionTypes.SET_FIRST_PAGE;

    constructor(public payload: Page) { }
}

export class SetSearchResultsCount implements Action {
    readonly type = PaginatorActionTypes.SET_SEARCH_RESULTS_COUNT;

    constructor(public payload: number) { }
}

export class AddLoadedPage implements Action {
    readonly type = PaginatorActionTypes.ADD_LOADED_PAGE;

    constructor(public payload: Page) {}
}

export class SetCurrentPage implements Action {
    readonly type = PaginatorActionTypes.SET_CURRENT_PAGE;

    constructor(public payload: number) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All
               = SetFirstPage
               | SetSearchResultsCount
               | AddLoadedPage
               | SetCurrentPage;
