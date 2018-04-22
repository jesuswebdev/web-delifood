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

            let existingItem = state.items.find(i => i.item._id === action.payload.item._id);
            let newItems = [];
            let newItemCount = undefined;

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
                existingItem.total += action.payload.total;
                newItems = state.items.filter(item => item.item._id != existingItem.item._id).concat(existingItem);
            }
            else {
                newItems = [...state.items, action.payload];
                newItemCount = state.itemCount += 1;
            }
            
            return { ...state,
                itemCount: existingItem ? state.itemCount : newItemCount,
                items: newItems,
                totalPayment: newItems.reduce((previous: number, current: CartItem) => { return previous + current.total }, 0)
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
            
            let newItems = state.items.map(item => {

                if (item.item._id === action.payload.item._id) {
                    item.quantity = action.payload.quantity;
                    item.total = action.payload.quantity * item.item.price;
                }
                return item;
            });
            
            let newPayment = state.items.reduce((previous: number, current: CartItem) => {return previous + current.total }, 0);

            return {
                ...state,
                items: newItems,
                totalPayment: newPayment
            };
        }

        case CartActions.CartActionTypes.REMOVE_ITEM_FROM_CART: {
            
            return {
                ...state,
                items: state.items.filter(item => item.item._id != action.payload),
                itemCount: state.itemCount - 1,
                totalPayment: state.totalPayment - state.items.find(item => item.item._id === action.payload).total
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

        case CartActions.CartActionTypes.RESET_CART: {

            return initialState;
        }
        default: {
            return state;
        }
    }
}
