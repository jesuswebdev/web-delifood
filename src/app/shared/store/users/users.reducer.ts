import * as UsersActions from './users.actions';
import { User } from './users.model';

export interface State {
         users: User[];
         count: number;
};

const initialState: State = {
        users: [],
        count: 0
};

export function reducer(state = initialState, action: UsersActions.All ): State {

    switch (action.type) {

        case UsersActions.UsersActionTypes.GET_USERS_SUCCESS: {
            return Object.assign({}, state, { users: action.payload });
        }

        case UsersActions.UsersActionTypes.SET_USERS_COUNT: {
            return Object.assign({}, state, { count: action.payload });
        }

        case UsersActions.UsersActionTypes.DELETE_USER_SUCCESS: {

            return Object.assign({}, state, {
                users: state.users.filter(user => user.id != action.payload),
                count: state.count - 1
            });
        }

        default: {
            return state;
        }
    }
}
