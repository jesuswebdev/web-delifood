import { Action } from '@ngrx/store';
import { Category } from './category.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum CategoryActionTypes {
    GET_CATEGORIES_SUCCESS = '[Category] Get Categories Success',
    SET_CATEGORIES_COUNT = '[Category] Set Categories Count',
    DELETE_CATEGORY_SUCCESS = '[Category] Delete Category Success',
    CREATE_CATEGORY_SUCCESS = '[Category] CREATE_CATEGORY_SUCCESS'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class GetCategoriesSuccess implements Action {
    readonly type = CategoryActionTypes.GET_CATEGORIES_SUCCESS;

    constructor(public payload: Category[]) { }
}

export class SetCategoriesCount implements Action {
    readonly type = CategoryActionTypes.SET_CATEGORIES_COUNT;

    constructor(public payload: number) { }
}

export class DeleteCategorySuccess implements Action {
    readonly type = CategoryActionTypes.DELETE_CATEGORY_SUCCESS;

    constructor(public payload: string) {}
}

export class CreateCategorySuccess implements Action {
    readonly type = CategoryActionTypes.CREATE_CATEGORY_SUCCESS;

    constructor(public payload: Category) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All
                = GetCategoriesSuccess
                | SetCategoriesCount
                | DeleteCategorySuccess
                | CreateCategorySuccess;
