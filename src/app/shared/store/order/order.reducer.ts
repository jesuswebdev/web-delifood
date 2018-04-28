import * as OrderActions from './order.actions';
import { Order } from '@delifood/store/order/order.model';
import { Cart } from '@delifood/store/cart/cart.model';

export interface State {
    sendOrderModalIsActive: boolean;
    tempOrder: Cart,
    orders: Order[]
};

const initialState: State = {
    sendOrderModalIsActive: false,
    tempOrder: undefined,
    orders: []
};

export function reducer(state = initialState, action: OrderActions.All ): State {

    switch (action.type) {
        case OrderActions.OrderActionTypes.ACTIVATE_SEND_ORDER_MODAL: {
            return {
                ...state,
                sendOrderModalIsActive: true,
                tempOrder: action.payload
            };
        }

        case OrderActions.OrderActionTypes.DISMIS_SEND_ORDER_MODAL: {
            return {
                ...state,
                sendOrderModalIsActive: false,
                tempOrder: undefined
            }
        }

        case OrderActions.OrderActionTypes.CREATE_ORDER_SUCCESS: {
            return {
                ...state,
                orders: state.orders && state.orders.length > 0 ? [...state.orders, action.payload] : [action.payload]
            };
        }

        case OrderActions.OrderActionTypes.GET_ORDERS_SUCCESS: {
            return {
                ...state,
                orders: action.payload
            };
        }

        default: {
            return state;
        }
    }
}
