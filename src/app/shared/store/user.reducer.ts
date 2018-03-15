import { Action } from './action.interface';
import { ApplicationState } from "./application.state";
import { INITIAL_APPLICATION_STATE } from './initial-state';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const RESET = 'RESET';

export function userReducer(state: ApplicationState = INITIAL_APPLICATION_STATE, action: Action): ApplicationState {
    switch (action.type) {
        
        case LOGIN: {
            state['userState'] = action.payload

            return state;
            // return {
            //     userState: action.payload
            // };
        }
        
        case LOGOUT: {
            return state = null;
        }

        case RESET: {
            return state = null;
        }
        
        default: {
            return state;
        }

    }
}