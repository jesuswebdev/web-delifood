import * as CartActions from './cart.actions';
import { CartItem } from '@delifood/store/cart/cart.model';
import { Product } from '@delifood/store/product/product.model';

export interface State {
    items: CartItem[];
    itemCount: number;
    totalPayment: number;
    modalIsActive: boolean;
    removeCartItemModalIsActive: boolean;
    tempProduct: Product;
};

const initialState: State = {
    items: [],
    itemCount: 0,
    totalPayment: 0,
    modalIsActive: false,
    removeCartItemModalIsActive: false,
    tempProduct: undefined
};

export function reducer(state = initialState, action: CartActions.All ): State {

    switch (action.type) {

        case CartActions.CartActionTypes.ADD_ITEM_TO_CART: {

            if (!state.items.find(item => item.item.id === action.payload.item.id)) {

                state.items = [...state.items, action.payload];
                state.itemCount += 1;
            }
            else {

                state.items.find(item => item.item.id === action.payload.item.id).quantity += action.payload.quantity;
                state.items.find(item => item.item.id === action.payload.item.id).total += action.payload.total;
            }
            
            return { ...state,
                totalPayment: state.items.reduce((previous: number, current: CartItem) => { return previous + current.total }, 0)
            }
        }

        case CartActions.CartActionTypes.ACTIVATE_CART_MODAL: {
            
            return {
                ...state,
                modalIsActive: true,
                tempProduct: action.payload
            }
        }

        case CartActions.CartActionTypes.DISMISS_CART_MODAL: {

            return {
                ...state,
                modalIsActive: false,
                tempProduct: undefined
            }
        }

        case CartActions.CartActionTypes.CHANGE_CART_ITEM_QUANTITY: {

            state.items.map(item => {

                if (item.item.id === action.payload.item.id) {
                    item.quantity = action.payload.quantity;
                    item.total = action.payload.quantity * item.item.price;
                }
            });

            state.totalPayment = state.items.reduce((previous: number, current: CartItem) => {return previous + current.total }, 0);

            return {
                ...state
            };
        }

        case CartActions.CartActionTypes.REMOVE_ITEM_FROM_CART: {

            state.items = state.items.filter(item => item.item.id != action.payload);
            state.itemCount -= 1;
            state.totalPayment = state.items.reduce((previous: number, current: CartItem) => { return previous + current.total }, 0);

            return {
                ...state
            };
        }

        case CartActions.CartActionTypes.ACTIVATE_REMOVE_ITEM_FROM_CART_MODAL: {

            return {
                ...state,
                removeCartItemModalIsActive: true,
                tempProduct: action.payload
            };
        }

        case CartActions.CartActionTypes.DISMISS_REMOVE_ITEM_FROM_CART_MODAL: {

            return {
                ...state,
                removeCartItemModalIsActive: false,
                tempProduct: undefined
            };
        }

        default: {
            return state;
        }
    }
}
