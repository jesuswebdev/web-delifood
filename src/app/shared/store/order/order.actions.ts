import { Action } from '@ngrx/store';
import { Cart } from '@delifood/store/cart/cart.model';
import { Order } from '@delifood/store/order/order.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum OrderActionTypes {
    ACTIVATE_SEND_ORDER_MODAL = '[Order] ACTIVATE SEND ORDER MODAL',
    DISMIS_SEND_ORDER_MODAL = '[Order] DISMISS SEND ORDER MODAL',
    CREATE_ORDER_SUCCESS = '[Order] CREATE ORDER SUCCESS'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class ActivateSendOrderModal implements Action {
    readonly type = OrderActionTypes.ACTIVATE_SEND_ORDER_MODAL;

    constructor(public payload: Cart) { }
}

export class DismissSendOrderModal implements Action {
    readonly type = OrderActionTypes.DISMIS_SEND_ORDER_MODAL;

    constructor() { }
}

export class CreateOrderSuccess implements Action {
    readonly type = OrderActionTypes.CREATE_ORDER_SUCCESS;

    constructor(public payload: Order) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All
                = ActivateSendOrderModal
                | DismissSendOrderModal
                | CreateOrderSuccess;
