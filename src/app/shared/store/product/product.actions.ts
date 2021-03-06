import { Action } from '@ngrx/store';
import { Product } from './product.model';
import { Comment } from '@delifood/store/comments/comment.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ProductActionTypes {
    GET_PRODUCTS_SUCCESS = '[Product] GET_PRODUCTS_SUCCESS',
    SET_PRODUCTS_COUNT = '[Product] SET_PRODUCTS_COUNT',
    DELETE_PRODUCT_SUCCESS = '[Product] DELETE_PRODUCT_SUCCESS',
    ACTIVATE_MODAL = '[Product] ACTIVATE_MODAL',
    DISMISS_MODAL = '[Product] DISMISS_MODAL',
    SEND_COMMENT_SUCCESS = '[Product] SEND COMMENT SUCCESS',
    LOAD_PRODUCT_COMMENTS = '[Product] LOAD PRODUCT COMMENTS',
    UNLOAD_PRODUCT_INFO = '[Product] UNLOAD PRODUCT INFO'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class GetProductsSuccess implements Action {
    readonly type = ProductActionTypes.GET_PRODUCTS_SUCCESS;

    constructor(public payload: Product[]) { }
}

export class SetProductsCount implements Action {
    readonly type = ProductActionTypes.SET_PRODUCTS_COUNT;

    constructor(public payload: number) { }
}

export class DeleteProductSuccess implements Action {
    readonly type = ProductActionTypes.DELETE_PRODUCT_SUCCESS;

    constructor(public payload: string) { }
}

export class ActivateModal implements Action {
    readonly type = ProductActionTypes.ACTIVATE_MODAL;
}

export class DismissModal implements Action {
    readonly type = ProductActionTypes.DISMISS_MODAL;
}

export class SendCommentSuccess implements Action {
    readonly type = ProductActionTypes.SEND_COMMENT_SUCCESS;

    constructor (public payload: Comment) { }
}

export class LoadProductComments implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT_COMMENTS;

    constructor (public payload: Comment[]) { }
}

export class UnloadProductInfo implements Action {
    readonly type = ProductActionTypes.UNLOAD_PRODUCT_INFO

    constructor () {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All
                = GetProductsSuccess
                | SetProductsCount
                | DeleteProductSuccess
                | ActivateModal
                | DismissModal
                | SendCommentSuccess
                | LoadProductComments
                | UnloadProductInfo;
