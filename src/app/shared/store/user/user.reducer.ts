import * as UserActions from './user.actions';

export interface State {
    name: string;
    email: string;
    id?: string;
    role: string;
    token?: string;
    address?: string;
    phone?: string;
    credentials?: {
        email: string;
        password: string;
    },
    logoutModalIsActive: boolean;

};

const initialState: State = {
    name: '',
    email: '',
    role: 'guest',
    logoutModalIsActive: false
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

        case UserActions.UserActionTypes.ACTIVATE_LOGOUT_MODAL: {
            
            return {
                ...state,
                logoutModalIsActive: true
            };
        }

        case UserActions.UserActionTypes.DISMISS_LOGOUT_MODAL: {

            return {
                ...state,
                logoutModalIsActive: false
            }
        }

        default: {
            return state;
        }
    }
}
