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

        case ProductActions.ProductActionTypes.SEND_COMMENT_SUCCESS: {

            console.log(action.payload);

            let product = state.products.find(p => p._id === action.payload.product);
            let products = state.products.filter(p => p._id !== action.payload.product);

            console.log(product);
            console.log(products);

            // product.comments.unshift(action.payload);
            product.commentsCount += 1;
            product.totalRating += action.payload.rating;
            product.rating = product.totalRating / product.commentsCount;

            products.push(product);

            return {
                ...state,
                products
            }
        }

        case ProductActions.ProductActionTypes.LOAD_PRODUCT_COMMENTS: {

            let productId = action.payload[0].product || '';
            let products = state.products.map(p => {
                
                if (p._id === productId) {
                        p.comments = action.payload;
                    }
                    return p;
                });

            return {
                ...state,
                products
            };

        }

        case ProductActions.ProductActionTypes.UNLOAD_PRODUCT_INFO: {

            return {
                ...state,
                products: []
            }
        }

        default: {
            return state;
        }
    }
}
