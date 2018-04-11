import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum SearchActionTypes {
    SEARCH = '[Search] SEARCH',
    WELCOME_SEARCH_SUBMITTED = '[Search] WELCOME SEARCH SUBMITTED',
    WELCOME_SEARCH_RECEIVED = '[Search] WELCOME SEARCH RECEIVED'
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

export class WelcomeSearchSubmitted implements Action {
    readonly type = SearchActionTypes.WELCOME_SEARCH_SUBMITTED;

    constructor() { }
}

export class WelcomeSearchReceived implements Action {
    readonly type = SearchActionTypes.WELCOME_SEARCH_RECEIVED;

    constructor() {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All
               = Search
               | WelcomeSearchSubmitted
               | WelcomeSearchReceived;
