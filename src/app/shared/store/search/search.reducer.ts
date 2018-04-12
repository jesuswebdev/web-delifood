import * as SearchActions from './search.actions';

export interface State {
    terms: string;
    welcomeSearchSubmitted: boolean;
    isLoading: boolean;
    isSearch: boolean;
};

const initialState: State = {
    terms: '',
    welcomeSearchSubmitted: false,
    isLoading: false,
    isSearch: false
};

export function reducer(state = initialState, action: SearchActions.All ): State {
    
    switch (action.type) {
        case SearchActions.SearchActionTypes.SEARCH: {
            
            return {
                ...state,
                terms: action.payload,
                isLoading: true,
                isSearch: true
            }
        }

        case SearchActions.SearchActionTypes.WELCOME_SEARCH_SUBMITTED: {

            return {
                ...state,
                welcomeSearchSubmitted: true
            }
        }

        case SearchActions.SearchActionTypes.WELCOME_SEARCH_RECEIVED: {
            
            return {
                ...state,
                welcomeSearchSubmitted: false
            }
        }

        case SearchActions.SearchActionTypes.SEARCH_IS_LOADING: {

            return {
                ...state,
                isLoading: true
            }
        }

        case SearchActions.SearchActionTypes.SEARCH_DONE_LOADING: {
            
            return {
                ...state,
                isLoading: false,
                isSearch: false
            }
        }

        default: {
            return state;
        }
    }
}
