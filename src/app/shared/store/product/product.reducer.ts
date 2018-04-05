import * as ProductActions from './product.actions';
import { Product } from './product.model';

export interface State {
         products: Product[],
         count: number,
         createCategoryModal: boolean
};

const initialState: State = {
        products: [],
        count: 0,
        createCategoryModal: false 
};

export function reducer(state = initialState, action: ProductActions.All ): State {
    
    switch (action.type) {

        case  ProductActions.ProductActionTypes.GET_PRODUCTS_SUCCESS: {

            // return Object.assign({}, state, { products: action.payload });
            return {  ...state, products: action.payload };
        }

        case ProductActions.ProductActionTypes.SET_PRODUCTS_COUNT: {

            return { ...state, count: action.payload };
        }

        case ProductActions.ProductActionTypes.DELETE_PRODUCT_SUCCESS: {

            return { ...state, 
                products: state.products.filter(product => product.id != action.payload),
                count: state.count - 1
             };
        }

        case ProductActions.ProductActionTypes.ACTIVATE_MODAL: {

            return { ...state, createCategoryModal: true };
        }

        case ProductActions.ProductActionTypes.DISMISS_MODAL: {

            return { ...state, createCategoryModal: false };
        }

        default: {
            return state;
        }
    }
}
