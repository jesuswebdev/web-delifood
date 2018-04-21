import * as OrderActions from './order.actions';
import { Order } from '@delifood/store/order/order.model';
import { Cart } from '@delifood/store/cart/cart.model';

export interface State {
    sendOrderModalIsActive: boolean;
    tempOrder: Cart
};

const initialState: State = {
    sendOrderModalIsActive: false,
    tempOrder: undefined
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

        default: {
            return state;
        }
    }
}
