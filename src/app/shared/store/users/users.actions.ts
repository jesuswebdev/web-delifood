import { Action } from '@ngrx/store';
import { User } from './users.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum UsersActionTypes {
    GET_USERS_SUCCESS = '[Users] Get Users Success',
    SET_USERS_COUNT = '[Users] Set Users Count',
    DELETE_USER_SUCCESS = '[Users] Delete User Success'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class GetUsersSuccess implements Action {
    readonly type = UsersActionTypes.GET_USERS_SUCCESS;

    constructor(public payload: User[]) { }
}

export class SetUsersCount implements Action {
    readonly type = UsersActionTypes.SET_USERS_COUNT;

    constructor(public payload: number) { }
}

export class DeleteUserSuccess implements Action {
    readonly type = UsersActionTypes.DELETE_USER_SUCCESS;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All
                = GetUsersSuccess
                | SetUsersCount
                | DeleteUserSuccess;
