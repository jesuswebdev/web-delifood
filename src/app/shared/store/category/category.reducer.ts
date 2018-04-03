import * as CategoryActions from './category.actions';
import { Category } from "./category.model";

export interface State {
         categories: Category[],
         count: number
};

const initialState: State = {
        categories: [],
        count: 0
};

export function reducer(state = initialState, action: CategoryActions.All ): State {

    switch (action.type) {

        case CategoryActions.CategoryActionTypes.GET_CATEGORIES_SUCCESS: {

            return Object.assign({}, state, { categories: action.payload });
        }

        case CategoryActions.CategoryActionTypes.SET_CATEGORIES_COUNT: {

            return Object.assign({}, state, { count: action.payload });
        }

        case CategoryActions.CategoryActionTypes.DELETE_CATEGORY_SUCCESS: {

            return Object.assign({}, state, {
                categories: state.categories.filter(category => category.id != action.payload)
            });
        }

        default: {
            return state;
        }
    }
}
