import { Action } from '@ngrx/store';
import { LoginCredentials, User } from './user.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum UserActionTypes {
    LOGIN = '[User] Login',
    LOGIN_SUCCESS = '[User] Login Success',
    LOGOUT = '[User] Logout',
    ACTIVATE_LOGOUT_MODAL = '[User] Activate Logout Modal',
    DISMISS_LOGOUT_MODAL = '[User] Dismiss Logout Modal',
    LOAD_USER = '[User] Load User'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class Login implements Action {
    readonly type = UserActionTypes.LOGIN;

    constructor(public payload: LoginCredentials) { }
}

export class LoginSuccess implements Action {
    readonly type = UserActionTypes.LOGIN_SUCCESS;

    constructor(public payload: User) { }
}

export class Logout implements Action {
    readonly type = UserActionTypes.LOGOUT;
}

export class LoadUser implements Action {
    readonly type = UserActionTypes.LOAD_USER;

    constructor(public payload: User) {}
}

export class ActivateLogoutModal implements Action {
    readonly type = UserActionTypes.ACTIVATE_LOGOUT_MODAL;

    constructor() { }
}

export class DismissLogoutModal implements Action {
    readonly type = UserActionTypes.DISMISS_LOGOUT_MODAL;

    constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All
                = Login
                | LoginSuccess
                | Logout
                | LoadUser
                | ActivateLogoutModal
                | DismissLogoutModal;
