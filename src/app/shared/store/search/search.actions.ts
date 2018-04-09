import { Action } from '@ngrx/store';
import { SearchResults } from '@delifood/store/search/search.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SearchActionTypes {
    SEARCH = '[Search] SEARCH',
    SEARCH_SUCCESS = '[Search] SEARCH_SUCCESS'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class Search implements Action {
    readonly type = SearchActionTypes.SEARCH;

    constructor(public payload: string) { }
}

export class SearchSuccess implements Action {
    readonly type = SearchActionTypes.SEARCH_SUCCESS;

    constructor(public payload: SearchResults) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All
               = Search
               | SearchSuccess;
