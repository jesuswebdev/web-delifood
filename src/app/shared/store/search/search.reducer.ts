import * as SearchActions from './search.actions';
import { Product } from '@delifood/store/product/product.model';

export interface State {
    terms: string;
    results: Product[],
    resultsCount: number;
};

const initialState: State = {
    terms: '',
    results: [],
    resultsCount: 0
};

export function reducer(state = initialState, action: SearchActions.All ): State {
    
    switch (action.type) {
        case SearchActions.SearchActionTypes.SEARCH: {
            
            return {
                ...state,
                terms: action.payload
            }
        }

        case SearchActions.SearchActionTypes.SEARCH_SUCCESS: {

            return {
                ...state,
                results: action.payload.products,
                resultsCount: action.payload.resultsCount
            }
        }

        default: {
            return state;
        }
    }
}
