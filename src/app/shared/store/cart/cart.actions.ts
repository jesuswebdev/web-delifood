import { Action } from '@ngrx/store';
import { CartItem } from '@delifood/store/cart/cart.model';
import { Product } from '@delifood/store/product/product.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum CartActionTypes {
    ADD_ITEM_TO_CART = '[Cart] ADD_ITEM_TO_CART',
    REMOVE_ITEM_FROM_CART = '[Cart] REMOVE_ITEM_FROM_CART',
    ADD_ONE_TO_EXISTING_ITEM_ON_CART = '[Cart] ADD_ONE_TO_EXISTING_ITEM_ON_CART',
    REMOVE_ONE_FROM_EXISTING_ITEM_ON_CART = '[Cart] REMOVE_ONE_FROM_EXISTING_ITEM_ON_CART',
    ACTIVATE_CART_MODAL = '[Cart] ACTIVATE_CART_MODAL',
    DISMISS_CART_MODAL = '[Cart] DISMISS_CART_MODAL',
    CHANGE_CART_ITEM_QUANTITY = '[Cart] CHANGE_CART_ITEM_QUANTITY',
    ACTIVATE_REMOVE_ITEM_FROM_CART_MODAL = '[Cart] ACTIVATE_REMOVE_ITEM_FROM_CART_MODAL',
    DISMISS_REMOVE_ITEM_FROM_CART_MODAL = '[Cart] DISMISS_REMOVE_ITEM_FROM_CART_MODAL',
    RESET_CART = '[Cart] RESET CART'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddItemToCart implements Action {
    readonly type = CartActionTypes.ADD_ITEM_TO_CART;

    constructor(public payload: CartItem) { }
}

export class RemoveItemFromCart implements Action {
    readonly type = CartActionTypes.REMOVE_ITEM_FROM_CART;

    constructor(public payload: string) { }
}

export class ActivateCartModal implements Action {
    readonly type = CartActionTypes.ACTIVATE_CART_MODAL;

    constructor(public payload: Product) {}
}

export class DismissCartModal implements Action {
    readonly type = CartActionTypes.DISMISS_CART_MODAL;

    constructor() {}
}

export class ChangeCartItemQuantity implements Action {
    readonly type = CartActionTypes.CHANGE_CART_ITEM_QUANTITY;

    constructor(public payload: CartItem) {}
}

export class ActivateRemoveItemFromCartModal implements Action {
    readonly type = CartActionTypes.ACTIVATE_REMOVE_ITEM_FROM_CART_MODAL;

    constructor(public payload: Product) {}
}

export class DismissRemoveItemFromCartModal implements Action {
    readonly type = CartActionTypes.DISMISS_REMOVE_ITEM_FROM_CART_MODAL;

    constructor() {}
}

export class ResetCart implements Action {
    readonly type = CartActionTypes.RESET_CART;

    constructor() {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All
                = AddItemToCart
                | RemoveItemFromCart
                | ActivateCartModal
                | DismissCartModal
                | ChangeCartItemQuantity
                | ActivateRemoveItemFromCartModal
                | DismissRemoveItemFromCartModal
                | ResetCart;
