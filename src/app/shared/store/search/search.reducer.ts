import * as SearchActions from './search.actions';

export interface State {
    terms: string;
    welcomeSearchSubmitted: boolean;
};

const initialState: State = {
    terms: '',
    welcomeSearchSubmitted: false
};

export function reducer(state = initialState, action: SearchActions.All ): State {
    
    switch (action.type) {
        case SearchActions.SearchActionTypes.SEARCH: {
            
            return {
                ...state,
                terms: action.payload
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

        default: {
            return state;
        }
    }
}
