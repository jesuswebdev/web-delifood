import * as UserActions from './user.actions';

export interface State {
         name: string;
         email: string;
         role: string;
         token?: string;
         credentials?: {
             email: string;
             password: string;
         }
};

const initialState: State = {
        name: '',
        email: '',
        role: ''
};

export function reducer(state = initialState, action: UserActions.All ): State {

    switch (action.type) {

        case UserActions.UserActionTypes.LOGIN: {

            return {
                ...state,
                credentials: action.payload
            };
        }

        case UserActions.UserActionTypes.LOGIN_SUCCESS: {

            delete state.credentials;
            return Object.assign({}, state, action.payload);
        }
        
        case UserActions.UserActionTypes.LOGOUT: {
            
            return initialState;
        }

        case UserActions.UserActionTypes.LOAD_USER: {

            return Object.assign({}, state, action.payload);
        }

        default: {
            return state;
        }
    }
}